import { CustomerCreateOrUpdateDTO } from "../controllers/customer/dto/CustomerCreateOrUpdateDTO";
import { CustomerDTO } from "../controllers/customer/dto/CustomerDTO";

export interface ICustomerService {
	create(customer: CustomerCreateOrUpdateDTO): Promise<CustomerDTO>;
	update(customer: CustomerCreateOrUpdateDTO): Promise<CustomerDTO>;
	delete(id: number): Promise<boolean>;
	getById(id: number): Promise<CustomerDTO | null>;
	getAll(): Promise<CustomerDTO[]>;
	getCustomerByUserId(userId: number): Promise<CustomerDTO[] | null>;
	countAllCustomerByUserId(userId: number): Promise<number>;
}
