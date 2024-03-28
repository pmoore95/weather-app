import { Place } from "../../../pages/api/v1/location/models";
import { apiClient } from "../apiClient"

export const getLocation = (q: string) => {
    return apiClient.get<Place[]>('/location', {
        params: {
            q
        }
    }).then((response) => response.data).catch((error) => {});
}

export const getLocationByLatLon = (lat: number, lon: number) => {
    return apiClient.get<Place>('/location', {
        params: {
            lat,
            lon,
        }
    }).then((response) => response.data).catch((error) => {});
}