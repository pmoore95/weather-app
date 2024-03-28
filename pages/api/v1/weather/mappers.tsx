import { TemperatureUnit } from "@/types";
import { ForecastResponse, rawOpenMeteoResponse } from "./models";

export const mapRawOpenMeteoResponse: (response: rawOpenMeteoResponse) => ForecastResponse = (response: rawOpenMeteoResponse) => {
    const { latitude, longitude, daily, daily_units } = response;
    const dailyForecast = daily.temperature_2m_max.map((max, index) => ({
        max,
        min: daily.temperature_2m_min[index],
        date: daily.time[index]
    }));

    return {
        unit: daily_units.temperature_2m_max === '°C' ? TemperatureUnit.Celsius : TemperatureUnit.Fahrenheit,
        lat: latitude,
        lon: longitude,
        dailyForecast
    }
}