export type Place = {
    lat: string,
    lon: string,
    display_name: string,
}

export type LocationAPIResponse = {
    data: Place[];
};

export type LocationRequestPayload = string | { lat: string, lon: string };