import { BalanceRecharge } from "./balanceRecharges.model";

export interface Wallet {
    id: number,
    balance: number;
    bankAccount: string;
    currency: string;
    customerId: number
}

export interface WalletOut {
    id: number,
    balance: number;
    bankAccount: string;
    currency: string;
    customerId: number
    balanceRecharges: BalanceRecharge[]
}