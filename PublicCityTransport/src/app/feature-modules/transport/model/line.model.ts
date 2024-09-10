import { Bus } from "./bus.model";
import { Direction } from "./direction.model";
import { Station } from "./station.model";

export interface Line {
    id: number;
    name: string;
    lineType: LineType;
    length: number;
    time: number;
}

export interface LineOut {
    id: number;
    name: string;
    lineType: LineType;
    length: number;
    time: number;
    buses: Bus[];
    directions: Direction[];
    stations: Station[];
}

export enum LineType {
    city = 0,
    suburban
}