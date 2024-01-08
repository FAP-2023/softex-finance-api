import { Transaction } from "../entites/transaction.entity";
import { TransactionCreateOrUpdateDTO } from "../controllers/transactions/dto/TransactionCreateOrUpdateDTO";


export interface ITransactionsService {
    getAllTransactions(): Promise<Transaction[]>;
    getTransactionById(id: number): Promise<Transaction | undefined>;
    createTransaction(transaction: TransactionCreateOrUpdateDTO): Promise<Transaction>;
    updateTransaction(transaction: TransactionCreateOrUpdateDTO): Promise<Transaction | undefined>;
    deleteTransaction(id: number): Promise<void>;
    findTransactionByUserId(userId: number): Promise<Transaction[]>;
}