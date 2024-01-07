import { Repository } from "typeorm";
import { AppDataSource } from "../services/database/app-data-source";
import { userRepository } from "./user.factory";
import { CustomerController } from "../controllers/customer/Customer.controller";
import { ICustomerService } from "../services/Icustomer.service";
import { Customer } from "../entites/Customer.entity";
import { ICustomerRepository } from "../repositories/ICustomer.repository";
import { CustomerService } from "../services/customer.service";
import { CustomerRepository } from "../repositories/Customer.repository";
import { ICustomerController } from "../controllers/customer/ICustomer.controller";

class CustomerFactory{
    public static createCustomerRepository(repository: Repository<Customer>): ICustomerRepository{
        return new CustomerRepository(repository);
    }
    public static createCustomerService(repository: ICustomerRepository): ICustomerService{
        return new CustomerService(repository, userRepository);
    }
    public static createCustomerController(service:ICustomerService): ICustomerController{
        return new CustomerController(service);
    }
}

export const customerRepository = CustomerFactory.createCustomerRepository(AppDataSource.getRepository(Customer));
export const customerService = CustomerFactory.createCustomerService(customerRepository);
export const customerController = CustomerFactory.createCustomerController(customerService);