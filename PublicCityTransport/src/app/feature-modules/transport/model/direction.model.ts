import { Departure } from "./departure.model";
import { Line } from "./line.model";
import { Station, StationOut } from "./station.model";

export interface Direction {
    id: number;
    name: string;
    firstStation: string;
    lineId: number;
}

export interface DirectionOut {
    id: number;
    name: string;
    firstStation: string;
    lineId: number;
    line: Line;
    departures: Departure[]
    stations: StationOut[]
}