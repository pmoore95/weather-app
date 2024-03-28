import { TextField } from '@/components/Input';
import { Button } from '@/components/Button';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getLocation, getLocationByLatLon } from '@/api/location/location';
import _ from 'lodash';
import { Select, Spin } from 'antd';
import { AimOutlined, LoadingOutlined } from '@ant-design/icons';
import { getWeather } from '@/api/weather/weather';

function showPosition(position: any) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    alert("Latitude: " + latitude + "\nLongitude: " + longitude);
}

function showError(error: any) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

export const TestContainer: React.FC = () => {
    const [inputValue, setInputValue] = React.useState<string|undefined>(undefined);
    const [geoLocation, setGeoLocation] = React.useState<GeolocationPosition|undefined>(undefined);
    const [val, setVal] = useState<string|undefined>(undefined);

    const onClick = () => {
        setGeoLocation(undefined);
        if (navigator.geolocation) {
            setVal(undefined);
            navigator.geolocation.getCurrentPosition(setGeoLocation, showError);
        }
    }

    const searchQuery = useQuery(['location', inputValue], () => getLocation(inputValue), {
        enabled: false, // Query will be enabled when inputValue is not empty,
        refetchOnWindowFocus: false,
        retry: false
      });

    const geoQuery = useQuery(['geoLocation', geoLocation], () => getLocationByLatLon(geoLocation?.coords?.latitude as number, geoLocation?.coords?.longitude as number), {
        enabled: false,
        refetchOnWindowFocus: false,
        retry: false,
    });

    const weatherQuery = useQuery(['weather', geoLocation], () => getWeather(geoLocation?.coords.latitude as number, geoLocation?.coords.longitude as number), {
        enabled: false,
        refetchOnWindowFocus: false,
        retry: false,
    })

    useEffect(() =>{
        const debouncedFn = _.debounce(searchQuery.refetch, 500);
        debouncedFn();
        return debouncedFn.cancel
    }, [inputValue, searchQuery.refetch])

    useEffect(() =>{
        const debouncedFn = _.debounce(geoQuery.refetch, 500);
        if(geoLocation) debouncedFn();
        return debouncedFn.cancel
    }, [geoQuery.refetch, geoLocation])

    const shouldShowNotFoundContent = inputValue && searchQuery.data;

    const isLoading = geoQuery.isLoading || searchQuery.isLoading;

    useEffect(()=>{
        if(geoQuery.data?.display_name) setVal(geoQuery.data.display_name)
    }, [geoQuery.data])

    
    useEffect(()=>{
        if(val && !weatherQuery.data) weatherQuery.refetch();
    }, [val, weatherQuery]);

    console.log(val);

    return (
        <div>
            <h1>Test Page</h1>
            <Select
                showSearch
                value={val}
                placeholder={'Search for city'}
                defaultActiveFirstOption={false}
                suffixIcon={isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : null}
                filterOption={false}
                onSearch={setInputValue}
                onChange={setVal}
                notFoundContent={shouldShowNotFoundContent && (isLoading ? 'Loading...' : 'no results') || null}
                options={searchQuery.data?.length ? searchQuery.data?.map(place => {
                    return {
                        value: place.display_name,
                        label: place.display_name
                    }
                }) : []}
                style={{ width: 200}}
                loading={isLoading}
            />
            <Button onClick={onClick} disabled={geoQuery.isLoading}>
                Use location
                <AimOutlined />
            </Button>

            <div>
                {weatherQuery.isLoading && <div>Loading weather...</div>}
                {weatherQuery.data && <div>
                    {weatherQuery.data.dailyForecast.map(dailyForecast => {
                    return (
                        <div key={dailyForecast.date}>
                            <div>{dailyForecast.date}</div>
                            <div>{dailyForecast.max}</div>
                            <div>{dailyForecast.min}</div>
                        </div>
                    )
                })}
                </div>}
            </div>
        </div>
    );
};