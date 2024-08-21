import { Gender, UserRole} from "./user.model";

export interface UserRegistration {
    email: string;
    password?: string;
    name?: string;
    surname?: string;
    role: UserRole;
}

export interface EmployeeRegistration extends UserRegistration {
    gender: Gender;
    phoneNumber: string;
    address: string;
    birthDate: Date;
    educationalBackground: string;
}

export interface CustomerRegistration extends UserRegistration {
    gender: Gender;
    phoneNumber: string;
    address: string;
    birthDate: Date;
}