import { Place, PlaceLite } from "../../../pages/api/v1/location/models";
import { apiClient } from "../apiClient"

export const getLocationsBySearchString = (q: string) => {
    return apiClient.get<PlaceLite[]>('/location', {
        params: {
            q
        }
    }).then((response) => response.data).catch((error) => {});
}

export const getLocationByLatLon = (lat: number, lon: number) => {
    return apiClient.get<Place>('/location/reverse', {
        params: {
            lat,
            lon,
        }
    }).then((response) => response.data).catch((error) => {});
}