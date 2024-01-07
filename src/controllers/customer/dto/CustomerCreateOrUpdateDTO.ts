import { Expose } from "class-transformer";
import { IsNumber, IsObject, IsString } from "class-validator";

export class CustomerCreateOrUpdateDTO {
	@Expose()
	@IsNumber()
	private id: number | null;

	@Expose()
	@IsObject()
	private userId: number | null;

	@Expose()
	@IsString()
	private email: string | null;

	constructor(id?: number, userId?: number, email?: string) {
		this.id = id || null;
		this.userId = userId || null;
		this.email = email || null;
	}
}
