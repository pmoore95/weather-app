import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Switch } from "antd";
import {
  Domain,
  GeoLocation,
  Place,
  PlaceLite,
  TemperatureUnit,
} from "@/types";
import GeolocationAutoDetectButton from "../../components/GeolocationAutoDetectButton";
import SearchSelectLocation from "./components/SearchSelectLocation";
import { getLocationByLatLon } from "@/frontend/api/location/location";
import { getErrorMessage } from "./untils";
import { ERROR_MESSAGES } from "./constants";
import { WeatherOverview } from "./components/WeatherOverview/WeatherOverview";

export const HomePage: React.FC = () => {
  const [place, setPlace] = useState<Place | undefined>(undefined);
  const [placeLite, setPlaceLite] = useState<PlaceLite | undefined>(undefined);
  const [geolocation, setGeolocation] = useState<GeoLocation | undefined>(
    undefined,
  );
  const [geolocationIsLoading, setGeolocationIsLoading] =
    useState<boolean>(false);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(
    TemperatureUnit.Celsius,
  );
  const [searchValueOverride, setSearchValueOverride] = useState<
    string | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const onGeolocationAutoDetect = (
    geolocationPosition: GeolocationPosition,
  ) => {
    setGeolocation({
      lat: geolocationPosition.coords.latitude,
      lon: geolocationPosition.coords.longitude,
    });
    setError(undefined);
    setGeolocationIsLoading(false);
  };

  const onGeolocationError = () => {
    setError(ERROR_MESSAGES.FAILED_GEOLOCATION_AUTO_DETECTION);
    setGeolocationIsLoading(false);
  };

  const onSearchSelection = (place: PlaceLite) => {
    setSearchValueOverride(undefined);
    setPlaceLite(place);
  };

  const onSearch = () => {
    setError(undefined);
    setSearchValueOverride(undefined);
    setPlaceLite(undefined);
    getPlaceByPlaceLiteQuery.remove();
  };

  const getPlaceByPlaceLiteQuery = useQuery(
    ["geoLocation", { lat: placeLite?.lat, lon: placeLite?.lon }],
    () => getLocationByLatLon(placeLite?.lat!, placeLite?.lon!),
    {
      enabled: !!placeLite,
      refetchOnWindowFocus: false,
      onError: () => setError(getErrorMessage(Domain.Location)),
    },
  );

  const getPlaceByGeolocationQuery = useQuery(
    ["geoLocation", { lat: geolocation?.lat, lon: geolocation?.lon }],
    () => getLocationByLatLon(geolocation?.lat!, geolocation?.lon!),
    {
      enabled: !!geolocation,
      refetchOnWindowFocus: false,
      onError: () => setError(getErrorMessage(Domain.Location)),
    },
  );

  /* We want to refresh every time geolocation is re-set even though it is the same - in case a search query has been made in between */
  useEffect(() => {
    if (geolocation) {
      getPlaceByGeolocationQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geolocation]);

  /* We want to refresh every time placeLite is re-set even though it is the same - in case geolocation auto-detection has been clicked in between */
  useEffect(() => {
    if (placeLite) {
      getPlaceByPlaceLiteQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placeLite]);

  useEffect(() => {
    if (
      !getPlaceByGeolocationQuery.isFetching &&
      getPlaceByGeolocationQuery.data
    ) {
      setPlace(getPlaceByGeolocationQuery.data);
      setSearchValueOverride(getPlaceByGeolocationQuery.data.display_name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPlaceByGeolocationQuery.isFetching]);

  useEffect(() => {
    if (!getPlaceByPlaceLiteQuery.isFetching && getPlaceByPlaceLiteQuery.data) {
      setPlace(getPlaceByPlaceLiteQuery.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPlaceByPlaceLiteQuery.isFetching]);

  const locationIsLoading =
    getPlaceByGeolocationQuery.isLoading ||
    getPlaceByPlaceLiteQuery.isLoading ||
    geolocationIsLoading;

  return (
    <div className="p-4 bg-slate-50 h-screen">
      <div className="flex justify-between items-center mb-20">
        <h1 className="mb-4 text-2xl font-bold">Weather Forecast App</h1>
        <div className="flex bg-neutral-200 rounded-full items-center p-1 gap-2">
          <span className="font-bold">Convert to °F</span>
          <Switch
            className="bg-neutral-400"
            onChange={(checked) =>
              setTemperatureUnit(
                checked ? TemperatureUnit.Fahrenheit : TemperatureUnit.Celsius,
              )
            }
          />
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <div className="flex gap-2">
          <SearchSelectLocation
            onChange={onSearchSelection}
            searchValueOverride={searchValueOverride}
            onSearch={onSearch}
            onError={() => setError(getErrorMessage(Domain.Location))}
            isLoading={locationIsLoading}
          />
          <GeolocationAutoDetectButton
            onGeolocationDetected={onGeolocationAutoDetect}
            onError={onGeolocationError}
            onLoading={() => setGeolocationIsLoading(true)}
            disabled={locationIsLoading}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        {place && (
          <WeatherOverview
            unit={temperatureUnit}
            place={place}
            onError={() => setError(getErrorMessage(Domain.Weather))}
            disableButtons={locationIsLoading}
          />
        )}
      </div>
      <div className="flex justify-center">
        {error && <span className="text-red-500 m-auto text-sm">{error}</span>}
      </div>
    </div>
  );
};
