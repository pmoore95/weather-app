import { TemperatureUnit } from "./types";

export const TEMPERATURE_SYMBOLS: Record<TemperatureUnit, string> = {
    [TemperatureUnit.Celsius]: '°C',
    [TemperatureUnit.Fahrenheit]: '°F',
}