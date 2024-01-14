import { Expose } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class TransactionDTO {
	@Expose()
	@IsString()
	productName: string;

	@Expose()
	@IsNumber()
	amount: number;

	@Expose()
	@IsString()
	userName: string;

	@Expose()
	@IsString()
	customerName: string;

	@Expose()
	@IsDate()
	expectedAt: Date;

    constructor(productName: string, amount: number, userName: string, customerName: string, expectedAt: Date) {
        this.productName = productName;
        this.amount = amount;
        this.userName = userName;
        this.customerName = customerName;
        this.expectedAt = expectedAt;
    }
}
