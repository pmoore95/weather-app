import { ForecastResponse, TemperatureUnit } from "@/types";
import { apiClient } from "../apiClient";

export const getWeatherForecast = async (
  lat: number,
  lon: number,
  unit: TemperatureUnit,
) => {
  return apiClient
    .get<ForecastResponse>("/weather", {
      params: {
        lat,
        lon,
        unit,
      },
    })
    .then((response) => response.data);
};

export const getHistoricWeatherData = async (
  lat: number,
  lon: number,
  unit: TemperatureUnit,
) => {
  return apiClient
    .get<ForecastResponse>("/weather/history", {
      params: {
        lat,
        lon,
        unit,
      },
    })
    .then((response) => response.data);
};
