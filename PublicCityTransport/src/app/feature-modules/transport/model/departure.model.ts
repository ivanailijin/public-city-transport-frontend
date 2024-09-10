import { Time } from "@angular/common";
import { Direction } from "./direction.model";

export interface Departure {
    id: number;
    day: string;
    time: string;
    directionId: number;
    lineId: number;
}

export interface DepartureOut {
    id: number;
    day: string;
    time: Time;
    directiondId: number;
    lineId: number;
    direction: Direction;
}