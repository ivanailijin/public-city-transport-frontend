export interface User {
    id: number;
    email: string;
    password?: string;
    name?: string;
    surname?: string;
    role: UserRole;
}

export interface Employee extends User {
    employeeRole: EmployeeRole;
    gender: Gender;
    phoneNumber: string;
    address: string;
    birthDate: Date;
    educationalBackground: string;
}

export interface Customer extends User {
    
    gender: Gender;
    phoneNumber: string;
    address: string;
    birthDate: Date;
}

export enum UserRole {
    customer = 0,
    employee,
    admin
}

export enum EmployeeRole {
    conductor,
    driver,
    dispatcher,
    director
}
export enum Gender {
    male,
    female
}

