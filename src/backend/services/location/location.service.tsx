import { AxiosError, HttpStatusCode } from "axios";
import { LocationAPIResponse } from "./location.models";
import { InternalServerError } from "@/backend/constants/errors";
import { defaultErrorHandler } from "@/backend/utils";
import { createApiClient } from "@/backend/apiClient";
import axiosRetry from "axios-retry";

const API_KEY = process.env.GEOCODE_API_KEY;

const API_URL = "https://geocode.maps.co";

const apiClient = createApiClient(API_URL);

axiosRetry(apiClient, {
  retries: 4,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    console.log("retrying!");
    switch (error.response?.status) {
      case HttpStatusCode.InternalServerError:
      case HttpStatusCode.Unauthorized: /* This isn't an issue if API Key is provided */
      case HttpStatusCode.TooManyRequests:
        return true;
      default:
        return false;
    }
  },
});

export const getLocationsBySearch = async (search: string) => {
  const locations = await apiClient
    .get<LocationAPIResponse>(`search`, {
      params: {
        q: search,
        api_key: API_KEY,
      },
    })
    .catch(defaultErrorHandler);

  return locations;
};

export const getLocationByLatLon = async (lat: number, lon: number) => {
  const location = await apiClient
    .get<LocationAPIResponse>(`reverse`, {
      params: {
        lat,
        lon,
        api_key: API_KEY,
      },
    })
    .catch((error: AxiosError) => {
      if (
        (error.code as HttpStatusCode | undefined) ===
        HttpStatusCode.Unauthorized
      )
        throw new InternalServerError();
      defaultErrorHandler(error);
    });

  return location;
};
