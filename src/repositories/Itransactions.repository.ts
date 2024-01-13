import { Transaction } from "../entites/transaction.entity";


export interface ITransactionsRepository {
    findAll(): Promise<Transaction[]>;
    findById(id: number): Promise<Transaction | undefined | null>;
    create(transaction: Transaction): Promise<Transaction>;
    update(transaction: Transaction): Promise<Transaction>;
    delete(id: number): Promise<boolean>;
    findTransactionByUserId(userId: number): Promise<Transaction[]>;
    countAllTransactionsByUserId(userId: number): Promise<number>;
}