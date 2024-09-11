import { User } from "src/app/infrastructure/auth/model/user.model";

export interface BalanceRecharge {
    id: number,
    amount: number;
    dateTime: Date;
    walletId: number;
    adminId: number
    admin: User
}