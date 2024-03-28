import axios from 'axios';
import { LocationAPIResponse, LocationRequestPayload, Place } from './models';

const API_KEY = '66049b4f2498d464766427fskb7cd8f';

const getParams = (search: LocationRequestPayload) => {
    return typeof search === 'string' ? { q: search } : search;
}

export const getLocation = async (search: LocationRequestPayload) => {
    const isString = typeof search === 'string';
    const basePath = 'https://geocode.maps.co';
    const extension = isString ? '/search' : '/reverse';
    const path = basePath + extension;

    const location = await axios.get<LocationAPIResponse>(path, {
        params: {
            ...getParams(search),
            'api_key': API_KEY
        }
    }).then((response) => response.data).catch((error) => {
    });

    return location;
}

export default getLocation;