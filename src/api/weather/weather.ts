import { ForecastResponse } from "../../../pages/api/v1/weather/models";
import { apiClient } from "../apiClient";

export const getWeather = async (lat: number, lon: number) => {
    return apiClient.get<ForecastResponse>('/weather', {
        params: {
            lat, 
            lon
        }
    }).then((response) => response.data).catch((error) => {});
}