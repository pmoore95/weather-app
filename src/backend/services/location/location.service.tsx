import axios, { AxiosError, HttpStatusCode } from 'axios';
import { LocationAPIResponse } from './location.models';
import { InternalServerError } from '@/backend/constants/errors';
import { defaultErrorHandler } from '@/backend/utils';

const API_KEY = '66049b4f2498d464766427fskb7cd8f';

const API_URL = 'https://geocode.maps.co';

export const getLocationsBySearch = async (search: string) => {
    const locations = await axios.get<LocationAPIResponse>(`${API_URL}/search`, {
        params: {
            q: search,
            'api_keyd': API_KEY
        }
    }).catch(defaultErrorHandler)

    return locations;
}

export const getLocationByLatLon = async (lat: number, lon: number) => {
    const location = await axios.get<LocationAPIResponse>(`${API_URL}/reverse`, {
        params: {
            lat,
            lon,
            'api_key': API_KEY
        }
    })
    .catch((error: AxiosError)=>{
        if(error.code as HttpStatusCode|undefined === HttpStatusCode.Unauthorized) throw new InternalServerError()
        defaultErrorHandler(error);
    })

    return location;
}



// const callLocationAPIWithDefaultErrorHandler = async (url: string, params: any) => {
//     return axios.get<LocationAPIResponse>(url, {params})
//     .then((response) => response.data)
//     .catch((error) => {
//     });
// }