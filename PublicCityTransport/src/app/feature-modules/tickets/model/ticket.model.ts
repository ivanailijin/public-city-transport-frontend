import { Line } from "../../transport/model/line.model";

export interface Ticket {
    id: number,
    zone: string;
    ticketType: TicketType;
    currentPrice: number;
}

export enum TicketType {
    unpersonalized = 0,
    personalized
}

export interface Unpersonalized {
    id: number,
    zone: string;
    ticketType: TicketType;
    currentPrice: number;
    unpersonalizedType: UnpersonalizedType
}

export interface UnpersonalizedOut {
    id: number,
    zone: string;
    ticketType: TicketType;
    currentPrice: number;
    unpersonalizedType: UnpersonalizedType
    lines: Line[];
}

export interface CustomerUnpersonalizedTicketOut extends UnpersonalizedOut {
    lineName: string;
    directionName: string;
    departureTime: string;
    purchaseDate: Date;
}

export enum UnpersonalizedType {
    onetimeticket = 0,
    dayticket,
    weeklyticket
}

export interface Personalized {
    id: number,
    zone: string;
    ticketType: TicketType;
    currentPrice: number;
    personalizedType: PersonalizedType
}

export interface PersonalizedOut {
    id: number,
    zone: string;
    ticketType: TicketType;
    currentPrice: number;
    personalizedType: PersonalizedType;
    line: Line[];
}

export interface CustomerPersonalizedTicketOut extends PersonalizedOut {
    purchaseDate: Date;
}

export enum PersonalizedType {
    monthlyticket = 0,
    annualticket
}