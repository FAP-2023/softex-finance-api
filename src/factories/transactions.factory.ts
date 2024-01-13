import { Repository } from "typeorm";
import { Transaction } from "../entites/transaction.entity";
import { ITransactionsRepository } from "../repositories/Itransactions.repository";
import { TransactionsRepository } from "../repositories/transactions.repository";
import { IUserRepository } from "../repositories/Iuser.repository";
import { ITransactionsService } from "../services/Itransactions.service";
import { TransactionService } from "../services/transactions.service";
import { ITransactionsController } from "../controllers/transactions/Itransactions.controller";
import { TransactionController } from "../controllers/transactions/transactions.controller";
import { userRepository } from "./user.factory";
import { AppDataSource } from "../database/app-data-source";


class TransactionsFactory {
    public static createTransactionsRepository(repository:Repository<Transaction>):ITransactionsRepository{
        const transactionsRepository:ITransactionsRepository = new TransactionsRepository(repository);
        return transactionsRepository;
    }

    public static createTransactionsService(transactionsRepository:ITransactionsRepository, userRepository:IUserRepository):ITransactionsService{
        const transactionsService:ITransactionsService = new TransactionService(transactionsRepository,userRepository);
        return transactionsService;
    }

    public static createTransactionsController(transactionsService:ITransactionsService):ITransactionsController{
        const transactionsController:ITransactionsController = new TransactionController(transactionsService);
        return transactionsController;
    }
}

export const transactionsRepository = TransactionsFactory.createTransactionsRepository(AppDataSource.getRepository(Transaction));
export const transactionsService = TransactionsFactory.createTransactionsService(transactionsRepository,userRepository);
export const transactionsController = TransactionsFactory.createTransactionsController(transactionsService);