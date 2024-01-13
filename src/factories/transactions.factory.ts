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
import { IProductsRepository } from "../repositories/Iproducts.repository";
import { ICustomerRepository } from "../repositories/ICustomer.repository";
import { productsRepository } from "./products.factory";
import { customerRepository } from "./customer.factory";


class TransactionsFactory {
    public static createTransactionsRepository(repository:Repository<Transaction>):ITransactionsRepository{
        const transactionsRepository:ITransactionsRepository = new TransactionsRepository(repository);
        return transactionsRepository;
    }

    public static createTransactionsService(transactionsRepository:ITransactionsRepository, userRepository:IUserRepository,productRepository:IProductsRepository,customerRepository:ICustomerRepository):ITransactionsService{
        const transactionsService:ITransactionsService = new TransactionService(transactionsRepository,userRepository,productRepository,customerRepository);
        return transactionsService;
    }

    public static createTransactionsController(transactionsService:ITransactionsService):ITransactionsController{
        const transactionsController:ITransactionsController = new TransactionController(transactionsService);
        return transactionsController;
    }
}

export const transactionsRepository = TransactionsFactory.createTransactionsRepository(AppDataSource.getRepository(Transaction));
export const transactionsService = TransactionsFactory.createTransactionsService(transactionsRepository,userRepository,productsRepository,customerRepository);
export const transactionsController = TransactionsFactory.createTransactionsController(transactionsService);