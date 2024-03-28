import { apiClient } from "../apiClient";

export const getWeather = async (lat: number, lon: number) => {
    return apiClient.get('/weather', {
        params: {
            lat, 
            lon
        }
    }).then((response) => response.data).catch((error) => {});
}