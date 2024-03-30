import { TemperatureUnit } from "@/types";
import axios from "axios";
import { dayjsUTC } from "@/utils";
import { RawOpenMeteoResponse } from "./weather.models";
import { mapRawOpenMeteoResponse } from "./weather.mappers";

export const getWeatherForecast = async (lat: number, lon: number, unit: TemperatureUnit = TemperatureUnit.Celsius, forecastDays: number = 5) => {
    const API_URL = 'https://api.open-meteo.com/v1/forecast';

    const weather = await axios.get(API_URL, {
        params: {
            latitude: lat,
            longitude: lon,
            forecast_days: forecastDays,
            temperature_unit: unit.toLowerCase(),
            daily: 'temperature_2m_max,temperature_2m_min',
            timezone: 'GMT',
        }
    }).then((response) => response.data)

    return mapRawOpenMeteoResponse(weather);
}

export const getHistoricWeatherData = async (lat: number, lon: number, unit: TemperatureUnit = TemperatureUnit.Celsius, pastDays: number = 5) => {
    const API_URL = 'https://archive-api.open-meteo.com/v1/archive';
    const weather = await axios.get<any,RawOpenMeteoResponse>(API_URL, {
        params: {
            latitude: lat,
            longitude: lon,
            start_date: dayjsUTC().subtract(pastDays, 'day').format('YYYY-MM-DD'),
            end_date: dayjsUTC().subtract(1, 'day').format('YYYY-MM-DD'),
            temperature_unit: unit.toLowerCase(),
            daily: 'temperature_2m_max,temperature_2m_min',
            timezone: 'GMT',
        }
    })

    return mapRawOpenMeteoResponse(weather);
}