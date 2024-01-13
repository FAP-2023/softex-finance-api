import { Customer } from "../entites/Customer.entity";

export interface ICustomerRepository {
    create(customer: Customer): Promise<Customer>;
    update(customer: Customer): Promise<Customer>;
    delete(id: number): Promise<boolean>;
    getById(id: number): Promise<Customer|null>;
    getAll(userId:number): Promise<Customer[]>;
    getCustomerByUserId(userId: number): Promise<Customer[]|null>;
    getOneByEmail(email: string): Promise<Customer|null>;
    countAllCustomerByUserId(userId: number): Promise<number>;
}