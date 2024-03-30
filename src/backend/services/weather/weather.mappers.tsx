import { ForecastResponse, TemperatureUnit } from "@/types";
import { RawOpenMeteoResponse } from "./weather.models";

export const mapRawOpenMeteoResponse: (response: RawOpenMeteoResponse) => ForecastResponse = (response: RawOpenMeteoResponse) => {
    const { latitude, longitude, daily, daily_units } = response;
    const dailyMeasurements = daily.temperature_2m_max.map((max, index) => ({
        max,
        min: daily.temperature_2m_min[index],
        date: daily.time[index]
    }));

    return {
        unit: daily_units.temperature_2m_max === '°C' ? TemperatureUnit.Celsius : TemperatureUnit.Fahrenheit,
        lat: latitude,
        lon: longitude,
        dailyMeasurements
    }
}