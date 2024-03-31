import { Place, PlaceLite } from "@/types";
import { apiClient } from "../apiClient";

export const getLocationsBySearchString = (q: string) => {
  return apiClient
    .get<PlaceLite[]>("/location", {
      params: {
        q,
      },
    })
    .then((response) => response.data);
};

export const getLocationByLatLon = (lat: number, lon: number) => {
  return apiClient
    .get<Place>("/location/reverse", {
      params: {
        lat,
        lon,
      },
    })
    .then((response) => response.data);
};
