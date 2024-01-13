import { Repository } from "typeorm";
import { Customer } from "../entites/Customer.entity";
import { ICustomerRepository } from "./ICustomer.repository";

export class CustomerRepository implements ICustomerRepository {
	private repository: Repository<Customer>;
	constructor(repository: Repository<Customer>, ) {
		this.repository = repository;
	}
	public async create(
		customer: Customer
	): Promise<Customer> {
		const customerSaved = await this.repository.save(customer);
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
	public async getById(id: number): Promise<Customer|null> {
		const foundUser = await this.repository.findOne({
            where: { id }
        });
        return foundUser;
	}
	public getAll(): Promise<Customer[]> {
		const allCustomers = this.repository.find();
        if (!allCustomers) {
            throw new Error("No customers found");
        }
        return allCustomers;
	}

    public async getCustomerByUserId(userId: number): Promise<Customer[]|null> {
        const foundCustomer = await this.repository.find({
            where: { user: { id: userId } },
            relations: ["user"]
        });
        return foundCustomer;
    }

	public async getOneByEmail(email: string): Promise<Customer|null> {
		const foundCustomer = await this.repository.findOne({
			where: { email },
			relations: ["user"]
		});
		return foundCustomer;
	}
}
