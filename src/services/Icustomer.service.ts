import { CustomerDTO } from "../controllers/customer/dto/CustomerDTO";

export interface ICustomerService {
	create(customer: CustomerDTO): Promise<CustomerDTO>;
	update(customer: CustomerDTO): Promise<CustomerDTO>;
	delete(id: number): Promise<boolean>;
	getById(id: number): Promise<CustomerDTO | null>;
	getAll(): Promise<CustomerDTO[]>;
	getCustomerByUserId(userId: number): Promise<CustomerDTO | null>;
}
