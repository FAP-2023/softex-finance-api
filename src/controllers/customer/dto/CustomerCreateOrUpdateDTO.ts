import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CustomerCreateOrUpdateDTO {
	@Expose()
	@IsNumber()
	id?: number | null;

	@Expose()
	@IsNumber()
	userId: number | null;

	@Expose()
	@IsString()
	email: string | null;

	@Expose()
	@IsString()
	name: string | null;

	constructor(id?: number, userId?: number, email?: string, name?: string) {
		this.id = id || null;
		this.userId = userId || null;
		this.email = email || null;
		this.name = name || null;
	}
}
