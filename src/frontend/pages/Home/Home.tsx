import { Button } from '@/frontend/components/Button';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Switch } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import WeatherCards from './components/WeatherOverview/components/WeatherCards';
import { GeoLocation, Place, PlaceLite, TemperatureUnit } from '@/types';
import GeolocationAutoDetectButton from '../../components/GeolocationAutoDetectButton';
import SearchSelectLocation from './components/SearchSelectLocation';
import { getLocationByLatLon } from '@/frontend/api/location/location';
import { getHistoricWeatherData, getWeatherForecast } from '@/frontend/api/weather/weather';

export const HomePage: React.FC = () => {
    const [place, setPlace] = useState<Place|undefined>(undefined);
    const [placeLite, setPlaceLite] = useState<PlaceLite|undefined>(undefined);
    const [geoLocation, setGeoLocation] = useState<GeoLocation|undefined>(undefined);
    const [showHistoricalData, setShowHistoricalData] = useState<boolean>(false);
    const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(TemperatureUnit.Celsius);
    const [searchValueOverride, setSearchValueOverride] = useState<string|undefined>(undefined);
    
    const onGeolocationAutoDetect = (geolocationPosition: GeolocationPosition) => {
        setGeoLocation({lat: geolocationPosition.coords.latitude, lon: geolocationPosition.coords.longitude});
    }

    const onSearchSelection = (place: PlaceLite) => {
        setSearchValueOverride(undefined);
        setPlaceLite(place);
    }

    const onSearch = (searchValue: string) => {
        setSearchValueOverride(undefined);
        setPlaceLite(undefined);
        getPlaceByPlaceLiteQuery.remove();
    }

    const getPlaceByPlaceLiteQuery = useQuery(['geoLocation', {lat: placeLite?.lat, lon: placeLite?.lon}], () => getLocationByLatLon(placeLite?.lat!, placeLite?.lon!), {
        enabled: false,
        refetchOnWindowFocus: false,
    });

    const getPlaceByGeolocationQuery = useQuery(['geoLocation', {lat: geoLocation?.lat, lon: geoLocation?.lon}], () => getLocationByLatLon(geoLocation?.lat!, geoLocation?.lon!), {
        enabled: false,
        refetchOnWindowFocus: false,
    });

    useEffect(()=>{
        if(geoLocation){
            getPlaceByGeolocationQuery.refetch();
        }
    }, [geoLocation])

    useEffect(()=>{
        if(!getPlaceByGeolocationQuery.isFetching && getPlaceByGeolocationQuery.data){
            setPlace(getPlaceByGeolocationQuery.data);
            setSearchValueOverride(getPlaceByGeolocationQuery.data.display_name);
        }
    }, [getPlaceByGeolocationQuery.isFetching])

    useEffect(()=>{
        if(placeLite){
            getPlaceByPlaceLiteQuery.refetch();
        }
    }, [placeLite])

    useEffect(()=>{
        if(!getPlaceByPlaceLiteQuery.isFetching && getPlaceByPlaceLiteQuery.data){
            setPlace(getPlaceByPlaceLiteQuery.data);
        }
    }, [getPlaceByPlaceLiteQuery.isFetching])


    const weatherQuery = useQuery(['weather', place], () => getWeatherForecast(place?.lat!, place?.lon!, temperatureUnit), {
        enabled: false,
        refetchOnWindowFocus: false,
    })

    const historicWeatherQuery = useQuery(['historicWeather', place], () => getHistoricWeatherData(place?.lat!, place?.lon!, temperatureUnit), {
        enabled: false,
        refetchOnWindowFocus: false,
    });

    useEffect(()=>{
        if(place){
            setShowHistoricalData(false);
            weatherQuery.refetch();
        }
    }, [place]);

    const previousOnClick = () => {
        historicWeatherQuery.refetch();
        setShowHistoricalData(true);
    }

    const nextOnClick = () => {
        weatherQuery.refetch();
        setShowHistoricalData(false);
    }

    const displayWeatherData = showHistoricalData ? historicWeatherQuery.data : weatherQuery.data;
    const isLoadingWeatherData = historicWeatherQuery.isLoading || weatherQuery.isLoading;

    const placeName = place?.address.city || place?.address.town || place?.address.state || place?.address.country;

    useEffect(()=>{
        if(displayWeatherData) {
            showHistoricalData ? historicWeatherQuery.refetch() : weatherQuery.refetch();
        }
    }, [temperatureUnit])

    const weatherCardsClass = isLoadingWeatherData && !showHistoricalData ? 'ml-[160px]' : ''
    return (
        <div className='p-4 bg-slate-50 h-screen'>
                <div className='flex justify-between items-center mb-20'>
                    <h1 className='mb-4 text-2xl font-bold'>Weather Forecast App</h1>
                    <div className='flex bg-neutral-200 rounded-full items-center p-1 gap-2'>
                        <span className='font-bold'>Convert to °F</span>
                        <Switch className='bg-neutral-400' onChange={(checked)=>setTemperatureUnit(checked ? TemperatureUnit.Fahrenheit : TemperatureUnit.Celsius)}/>
                    </div>
                </div>
                <div className='flex justify-center mb-8'>
                    <div className='flex gap-2'>
                        <SearchSelectLocation onChange={onSearchSelection} searchValueOverride={searchValueOverride} onSearch={onSearch}/>
                        <GeolocationAutoDetectButton onGeolocationDetected={onGeolocationAutoDetect}/>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                {place && <h2 className='text-xl font-medium mb-4'>Temperatures in {placeName}</h2>}
                    {(displayWeatherData || isLoadingWeatherData) &&
                        <div className='flex items-center gap-4'>
                            {(!showHistoricalData && !isLoadingWeatherData) && <Button onClick={previousOnClick} className='flex items-center'>
                                <LeftOutlined />
                                Previous 5 days
                            </Button>}
                            <WeatherCards measurements={displayWeatherData?.dailyMeasurements || []} isLoading={isLoadingWeatherData} className={weatherCardsClass} unit={displayWeatherData?.unit!}/>
                            {(showHistoricalData && !isLoadingWeatherData) && <Button onClick={nextOnClick}>
                                Show Forecast
                                <RightOutlined />
                            </Button>}
                        </div>}
                </div>
                
        </div>
    );
};