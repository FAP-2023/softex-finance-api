import { CustomerCreateOrUpdateDTO } from "../controllers/customer/dto/CustomerCreateOrUpdateDTO";
import { Customer } from "../entites/Customer.entity";

export interface ICustomerRepository {
    create(customer: CustomerCreateOrUpdateDTO): Promise<Customer>;
    update(customer: Customer): Promise<Customer>;
    delete(id: number): Promise<boolean>;
    getById(id: number): Promise<Customer>;
    getAll(): Promise<Customer[]>;
    getCustomerByUserId(userId: number): Promise<Customer>;
}