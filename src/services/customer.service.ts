import { plainToInstance } from "class-transformer";
import { Customer } from "../entites/Customer.entity";
import { ICustomerRepository } from "../repositories/ICustomer.repository";
import { IUserRepository } from "../repositories/Iuser.repository";
import { CustomerDTO } from "../controllers/customer/dto/CustomerDTO";
import { ICustomerService } from "./Icustomer.service";

export class CustomerService implements ICustomerService {
	private customerRepository: ICustomerRepository;
	private userRepository: IUserRepository;

	constructor(
		customerRepository: ICustomerRepository,
		userRepository: IUserRepository
	) {
		this.customerRepository = customerRepository;
		this.userRepository = userRepository;
	}

	public async create(customerDTO: any): Promise<any> {
		const user = await this.userRepository.findOneById(customerDTO.userId);
		if (!user) {
			throw new Error("User not found");
		}
		const customerObject = new Customer();
		Object.assign(customerObject, customerDTO);
		customerObject.user = user;
		const customer = await this.customerRepository.create(customerObject);
		return customer;
	}

	public async getAll(): Promise<CustomerDTO[]> {
		const customers = await this.customerRepository.getAll();
		const customersDTO = customers.map((customer) => {
			const customerDTO = plainToInstance(CustomerDTO, customer, {
				excludeExtraneousValues: true,
			});
			return customerDTO;
		});
		return customersDTO;
	}

	public async getById(id: number): Promise<CustomerDTO | null> {
		const customer = await this.customerRepository.getById(id);
		if (!customer) {
			throw new Error("Customer not found");
		}
		const dto = plainToInstance(CustomerDTO, customer, {
			excludeExtraneousValues: true,
		});
		return dto;
	}

	public async update(customerDTO: CustomerDTO): Promise<CustomerDTO> {
		const customer = await this.customerRepository.getById(
			customerDTO.id as number
		);
		if (!customer) {
			throw new Error("Customer not found");
		}
		Object.assign(customer, customerDTO);
		const updatedCustomer = await this.customerRepository.update(customer);
		const dto = plainToInstance(CustomerDTO, updatedCustomer, {
			excludeExtraneousValues: true,
		});
		return dto;
	}

	public async delete(id: number): Promise<boolean> {
		const didDelete = await this.customerRepository.delete(id);
		if (!didDelete) {
			throw new Error("Error deleting customer");
		}
		return didDelete;
	}

	public async getCustomerByUserId(
		userId: number
	): Promise<CustomerDTO | null> {
		const customer = await this.customerRepository.getCustomerByUserId(
			userId
		);
		if (!customer) {
			throw new Error("Customer not found");
		}
		const dto = plainToInstance(CustomerDTO, customer, {
			excludeExtraneousValues: true,
		});
		return dto;
	}
}
