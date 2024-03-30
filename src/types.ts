
export type GeoLocation = {
    lat: number,
    lon: number
}

export enum TemperatureUnit {
    Celsius = 'Celsius',
    Fahrenheit = 'Fahrenheit'
}

export interface Place extends PlaceLite {
    address: PlaceAddress
}

export interface PlaceLite {
    lat: number,
    lon: number,
    display_name: string,
    place_id: string,
}

export type PlaceAddress = {
    city?: string
    town?: string
    county: string
    state: string
    country: string
}

export type ForecastResponse = {
    unit: TemperatureUnit,
    lat: number;
    lon: number;
    dailyMeasurements: DailyMeasurement[];
}

export type DailyMeasurement = {
    max: number;
    min: number;
    date: string;
}
