export interface PersonalizedTicketRequest {
    id: number,
    status: RequestStatus;
    userCategory: UserCategory;
    customerId: number;
    personalizedId: number;
    adminId?: number;
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