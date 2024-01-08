import { Repository } from "typeorm";
import { Transaction } from "../entites/transaction.entity";
import { ITransactionsRepository } from "./Itransactions.repository";


export class TransactionsRepository implements ITransactionsRepository {
    private repository: Repository<Transaction>;
    constructor(repository: Repository<Transaction>) {
        this.repository = repository;
    }

    async findAll(): Promise<Transaction[]> {
        try {
            const foundTransactions = await this.repository.find();
            if (!foundTransactions) {
                throw new Error("Erro fetching transactions");
            }
            return foundTransactions;            
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async create(transaction: Transaction): Promise<Transaction> {
        try {
            const createdTransaction = await this.repository.save(transaction);
            if (!createdTransaction) {
                throw new Error("Erro creating transaction");
            }
            return createdTransaction;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deletedTransaction = await this.repository.delete(id);
            if (deletedTransaction.affected === 0) {
                throw new Error("Transaction not found");
            }
            return true;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async findById(id: number): Promise<Transaction | undefined | null> {
        try {
            const foundTransaction = await this.repository.findOne({
                where:{
                    id: id,
                },
            });
            if (!foundTransaction) {
                throw new Error("Transaction not found");
            }            
            return foundTransaction;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async update(transaction: Transaction): Promise<Transaction> {
        try {
            const updatedTransaction = await this.repository.save(transaction);
            if (!updatedTransaction) {
                throw new Error("Error updating transaction");
            }
            return updatedTransaction;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    findTransactionByUserId(userId: number): Promise<Transaction[]> {
		try {
			const foundTransactions = this.repository.find({
				where: {
					user_id: userId,
				},
			});
			return foundTransactions;
		} catch (error:any) {
			throw new Error(error.message);
		}
	}
}