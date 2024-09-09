import { Employee } from "src/app/infrastructure/auth/model/user.model";

export interface Bus {
    id: number,
    garageNumber: string;
    licencePlate: string;
    busBrand: string;
    yearOfProduction: string;
    arrivalDate: Date;
}

export interface BusOut {
    id: number,
    garageNumber: string;
    licencePlate: string;
    busBrand: string;
    yearOfProduction: string;
    arrivalDate: Date;
    employees: Employee[];
}