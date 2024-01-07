import { Repository } from "typeorm";
import { CustomerCreateOrUpdateDTO } from "../controllers/customer/dto/CustomerCreateOrUpdateDTO";
import { Customer } from "../entites/Customer.entity";
import { ICustomerRepository } from "./ICustomer.repository";

export class CustomerRepository implements ICustomerRepository {
	private repository: Repository<Customer>;
	constructor(repository: Repository<Customer>) {
		this.repository = repository;
	}
	public async create(
		customer: CustomerCreateOrUpdateDTO
	): Promise<Customer> {
		const customerEntity = new Customer();
		Object.assign(customerEntity, customer);
		const customerSaved = await this.repository.save(customerEntity);
		if (!customerSaved) {
			throw new Error("Error creating customer");
		}
		return customerSaved;
	}
	public async update(customer: Customer): Promise<Customer> {
		const savedCustomer = await this.repository.save(customer);
		if (!savedCustomer) {
			throw new Error("Error updating customer");
		}
		return savedCustomer;
	}
	public async delete(id: number): Promise<boolean> {
		const didDelete = await this.repository.softDelete(id);
        if(!didDelete){
            throw new Error("Error deleting customer");
        }
        return true;
	}
	public async getById(id: number): Promise<Customer> {
		const foundUser = await this.repository.findOne({
            where: { id }
        });
        if (!foundUser) {
            throw new Error("Customer not found");
        }
        return foundUser;
	}
	public getAll(): Promise<Customer[]> {
		const allCustomers = this.repository.find();
        if (!allCustomers) {
            throw new Error("No customers found");
        }
        return allCustomers;
	}

    public async getCustomerByUserId(userId: number): Promise<Customer> {
        const foundCustomer = await this.repository.findOne({
            where: { user: { id: userId } },
            relations: ["user"]
        });
        if (!foundCustomer) {
            throw new Error("Customer not found");
        }
        return foundCustomer;
    }
}
