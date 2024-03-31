type OpenMeteoTemperatureUnit = "°C" | "°F";

export type RawOpenMeteoResponse = {
  latitude: number;
  longitude: number;
  timezone: string;
  elevation: number;
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
  };
  daily_units: {
    temperature_2m_max: OpenMeteoTemperatureUnit;
    temperature_2m_min: OpenMeteoTemperatureUnit;
    time: string;
  };
};
