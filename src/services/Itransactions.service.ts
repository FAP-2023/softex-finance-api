import { Transaction } from "../entites/transaction.entity";
import { TransactionCreateOrUpdateDTO } from "../controllers/transactions/dto/TransactionCreateOrUpdateDTO";


export interface ITransactionsService {
    getAllTransactions(): Promise<TransactionCreateOrUpdateDTO[]>;
    getTransactionById(id: number): Promise<TransactionCreateOrUpdateDTO | undefined>;
    createTransaction(transaction: TransactionCreateOrUpdateDTO): Promise<TransactionCreateOrUpdateDTO>;
    updateTransaction(transaction: TransactionCreateOrUpdateDTO): Promise<Transaction | undefined>;
    deleteTransaction(id: number): Promise<boolean>;
    findTransactionByUserId(userId: number): Promise<TransactionCreateOrUpdateDTO[]>;
}