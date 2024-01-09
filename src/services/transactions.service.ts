import { plainToClass, plainToInstance } from "class-transformer";
import { TransactionCreateOrUpdateDTO } from "../controllers/transactions/dto/TransactionCreateOrUpdateDTO";
import { Transaction } from "../entites/transaction.entity";
import { ITransactionsRepository } from "../repositories/Itransactions.repository";
import { IUserRepository } from "../repositories/Iuser.repository";
import { ITransactionsService } from "./Itransactions.service";

export class TransactionService implements ITransactionsService {
	private transactionRepository: ITransactionsRepository;
	private userRepository: IUserRepository;
	constructor(
		transactionRepository: ITransactionsRepository,
		userRepository: IUserRepository
	) {
		this.transactionRepository = transactionRepository;
		this.userRepository = userRepository;
	}

	async createTransaction(
		transaction: TransactionCreateOrUpdateDTO
	): Promise<TransactionCreateOrUpdateDTO> {
		try {
			const foundUser = await this.userRepository.findOneById(
				transaction.user_id
			);
			if (!foundUser) {
				throw new Error("User not found");
			}
			const prod = new Transaction();
			Object.assign(prod, transaction);
			prod.amount = transaction.amount;
			prod.type = transaction.type;

			const createdTransaction = await this.transactionRepository.create(
				prod
			);
			if (!createdTransaction) {
				throw new Error("Error creating transaction");
			}
			const createdTransactionDTO = plainToInstance(
				TransactionCreateOrUpdateDTO,
				createdTransaction
			);
			return createdTransactionDTO;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async deleteTransaction(id: number): Promise<boolean> {
		try {
			const didDelete = await this.transactionRepository.delete(id);
			if (!didDelete) {
				throw new Error("Error deleting transaction");
			}
			return true;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async getAllTransactions(): Promise<TransactionCreateOrUpdateDTO[]> {
		try {
			const foundTransactions =
				await this.transactionRepository.findAll();
			if (foundTransactions.length === 0) {
				return [];
			}
			const foundTransactionsDtoList = foundTransactions.map(
				(transaction) =>
					plainToInstance(TransactionCreateOrUpdateDTO, transaction)
			);
			return foundTransactionsDtoList;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async getTransactionById(id: number): Promise<TransactionCreateOrUpdateDTO | undefined> {
		try {
			const foundTransaction = await this.transactionRepository.findById(
				id
			);
			if (!foundTransaction) {
				throw new Error("Error fetching transaction");
			}
			const transactionDto = plainToInstance(TransactionCreateOrUpdateDTO, foundTransaction)
			return transactionDto;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async updateTransaction(
		transaction: TransactionCreateOrUpdateDTO
	): Promise<Transaction | undefined> {
		try {
			const foundTransaction = await this.transactionRepository.findById(
				transaction.id
			);
			if (!foundTransaction) {
				throw new Error("Transaction not found");
			}
			Object.assign(foundTransaction, transaction);
			const updatedTransaction = await this.transactionRepository.update(
				foundTransaction
			);
			if (!updatedTransaction) {
				throw new Error("Error updating transaction");
			}
			return updatedTransaction;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async findTransactionByUserId(userId: number): Promise<TransactionCreateOrUpdateDTO[]> {
		try {
			const foundTransactions =
				await this.transactionRepository.findTransactionByUserId(
					userId
				);
			if (!foundTransactions) {
				throw new Error("Error fetching transactions");
			}
			const foundTransactionsDtoList = foundTransactions.map(
				(transaction) =>
					plainToInstance(TransactionCreateOrUpdateDTO, transaction)
			);
			return foundTransactionsDtoList;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
