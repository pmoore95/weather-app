import { TemperatureUnit } from "@/types";

type OpenMeteoTemperatureUnit = '°C' | '°F';

export type rawOpenMeteoResponse = {
    latitude: number;
    longitude: number;
    timezone: string;
    elevation: number;
    daily: {
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        time: string[];
    }
    daily_units: {
        temperature_2m_max: OpenMeteoTemperatureUnit;
        temperature_2m_min: OpenMeteoTemperatureUnit;
        time: string
    }
}

export type DailyForecast = {
    max: number;
    min: number;
    date: string;
}

export type ForecastResponse = {
    unit: TemperatureUnit,
    lat: number;
    lon: number;
    dailyForecast: DailyForecast[];
}