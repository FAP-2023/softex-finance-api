import { Customer } from "../entites/Customer.entity";

export interface ICustomerRepository {
    create(customer: Customer): Promise<Customer>;
    update(customer: Customer): Promise<Customer>;
    delete(id: number): Promise<boolean>;
    getById(id: number): Promise<Customer|null>;
    getAll(): Promise<Customer[]>;
    getCustomerByUserId(userId: number): Promise<Customer[]|null>;
}