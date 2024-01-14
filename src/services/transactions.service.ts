import { plainToInstance } from "class-transformer";
import { TransactionCreateOrUpdateDTO } from "../controllers/transactions/dto/TransactionCreateOrUpdateDTO";
import { Transaction } from "../entites/transaction.entity";
import { ITransactionsRepository } from "../repositories/Itransactions.repository";
import { IUserRepository } from "../repositories/Iuser.repository";
import { ITransactionsService } from "./Itransactions.service";
import { IProductsRepository } from "../repositories/Iproducts.repository";
import { ICustomerRepository } from "../repositories/ICustomer.repository";
import { TransactionDTO } from "../controllers/transactions/dto/TransactionDTO";

export class TransactionService implements ITransactionsService {
	private transactionRepository: ITransactionsRepository;
	private userRepository: IUserRepository;
	private productRepository: IProductsRepository;
	private customerRepository: ICustomerRepository;

	constructor(
		transactionRepository: ITransactionsRepository,
		userRepository: IUserRepository,
		productRepository: IProductsRepository,
		customerRepository: ICustomerRepository
	) {
		this.transactionRepository = transactionRepository;
		this.userRepository = userRepository;
		this.productRepository = productRepository;
		this.customerRepository = customerRepository;
	}

	async createTransaction(
		transaction: TransactionCreateOrUpdateDTO
	): Promise<TransactionCreateOrUpdateDTO> {
		try {
			const foundUser = await this.userRepository.findOneById(
				transaction.user_id
			);
			const foundProduct = await this.productRepository.findById(transaction.product_id as number);
			const foundCustomer = await this.customerRepository.getById(transaction.customer_id);
			if (!foundProduct) {
				throw new Error("Product not found");
			}
			if (!foundCustomer) {
				throw new Error("Customer not found");
			}
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
				transaction.id as number
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

	async findTransactionByUserId(userId: number): Promise<TransactionDTO[]> {
		try {
			const foundTransactions =
				await this.transactionRepository.findTransactionByUserId(
					userId
				);
			if (!foundTransactions) {
				throw new Error("Error fetching transactions");
			}
			const foundTransactionsDtoList = foundTransactions.map(
				(transaction) =>{
					const dto = new TransactionDTO(transaction?.product?.name, transaction.amount, transaction.user.name, transaction.customer.name, transaction.expected_at);
					return dto;
				}
			);
			return foundTransactionsDtoList;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async countAllTransactionsByUserId(userId: number): Promise<number> {
		try {
			const count = await this.transactionRepository.countAllTransactionsByUserId(
				userId
			);
			return count;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}
}
