import { Customer, User } from "src/app/infrastructure/auth/model/user.model";
import { Personalized } from "./ticket.model";

export interface PersonalizedTicketRequest {
    id: number,
    status: RequestStatus;
    userCategory: UserCategory;
    customerId: number;
    personalizedId: number;
    adminId?: number;
}

export interface PersonalizedTicketRequestOut {
    id: number,
    status: RequestStatus;
    userCategory: UserCategory;
    customerId: number;
    customer: Customer
    personalizedId: number;
    personalized: Personalized;
    adminId?: number;
    admin: User;
}

export enum RequestStatus {
    onhold = 0,
    approved,
    rejected
}

export enum UserCategory {
    citizen = 0,
    pupil,
    student,
    employee,
    retiree
}