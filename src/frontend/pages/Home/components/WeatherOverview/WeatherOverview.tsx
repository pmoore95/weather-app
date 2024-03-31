import { Place, TemperatureUnit } from "@/types";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import WeatherCards from "./components/WeatherCards";
import { useQuery } from "react-query";
import {
  getHistoricWeatherData,
  getWeatherForecast,
} from "@/frontend/api/weather/weather";

export type WeatherOverviewProps = {
  place?: Place;
  unit: TemperatureUnit;
  onError?: (error: string) => void;
  disableButtons?: boolean;
};

export const WeatherOverview = ({
  unit,
  place,
  onError,
  disableButtons,
}: WeatherOverviewProps) => {
  const [showHistoricalData, setShowHistoricalData] = useState<boolean>(false);

  const weatherQuery = useQuery(
    ["weather", place],
    () => getWeatherForecast(place?.lat!, place?.lon!, unit),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onError,
    },
  );

  const historicWeatherQuery = useQuery(
    ["historicWeather", place],
    () => getHistoricWeatherData(place?.lat!, place?.lon!, unit),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onError,
    },
  );

  const previousOnClick = () => {
    historicWeatherQuery.refetch();
    setShowHistoricalData(true);
  };

  const nextOnClick = () => {
    weatherQuery.refetch();
    setShowHistoricalData(false);
  };

  const data = showHistoricalData
    ? historicWeatherQuery.data
    : weatherQuery.data;
  const isLoading = historicWeatherQuery.isLoading || weatherQuery.isLoading;
  const weatherCardsClass =
    isLoading && !showHistoricalData ? "ml-[160px]" : "";
  const placeName =
    place?.address.city ||
    place?.address.town ||
    place?.address.state ||
    place?.address.country;

  useEffect(() => {
    if (data) {
      showHistoricalData
        ? historicWeatherQuery.refetch()
        : weatherQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  useEffect(() => {
    if (place) {
      setShowHistoricalData(false);
      weatherQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place]);

  return (
    <>
      <h2 className="text-xl font-medium mb-4">Temperatures in {placeName}</h2>
      <div className="flex items-center gap-4">
        {!showHistoricalData && !isLoading && (
          <Button
            onClick={previousOnClick}
            className="flex items-center"
            disabled={disableButtons}
          >
            <LeftOutlined />
            Previous 5 days
          </Button>
        )}

        <WeatherCards
          measurements={data?.measurements || []}
          isLoading={isLoading}
          className={weatherCardsClass}
          unit={data?.unit}
        />
        {showHistoricalData && !isLoading && (
          <Button
            onClick={nextOnClick}
            className="flex items-center"
            disabled={disableButtons}
          >
            Show Forecast
            <RightOutlined />
          </Button>
        )}
      </div>
    </>
  );
};
