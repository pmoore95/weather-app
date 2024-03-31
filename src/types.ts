export type GeoLocation = {
  lat: number;
  lon: number;
};

export enum TemperatureUnit {
  Celsius = "celsius",
  Fahrenheit = "fahrenheit",
}

export interface Place extends PlaceLite {
  address: PlaceAddress;
}

export interface PlaceLite {
  lat: number;
  lon: number;
  display_name: string;
  place_id: string;
}

export type PlaceAddress = {
  city?: string;
  town?: string;
  county: string;
  state: string;
  country: string;
};

export type ForecastResponse = {
  unit: TemperatureUnit;
  lat: number;
  lon: number;
  measurements: Measurement[];
};

export type Measurement = {
  max: number;
  min: number;
  date: string;
};

export enum Domain {
  Weather = "weather",
  Location = "location",
}
