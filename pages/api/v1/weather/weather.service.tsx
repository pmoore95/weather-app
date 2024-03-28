import { TemperatureUnit } from "@/types";
import axios from "axios";
import { last } from "lodash";

const BASE_PATH = 'https://api.open-meteo.com/v1/forecast'

export const getWeatherForecast = async (lat: number, lon: number, unit: TemperatureUnit = TemperatureUnit.Celsius, forecastDays: number = 5) => {
    const weather = await axios.get(BASE_PATH, {
        params: {
            latitude: lat,
            longitude: lon,
            forecast_days: forecastDays,
            temperature_unit: unit.toLowerCase(),
            daily: 'temperature_2m_max,temperature_2m_min',
            timezone: 'GMT',
        }
    }).then((response) => response.data).catch((error) => {
    });

    return weather;
}