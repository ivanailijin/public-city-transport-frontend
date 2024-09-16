import { Location } from "./location.model";

export interface Station {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    locationId: number;
}

export interface StationOut {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    locationId: number;
    location: Location;
}