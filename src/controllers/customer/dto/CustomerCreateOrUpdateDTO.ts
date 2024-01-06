import { Expose } from "class-transformer";
import { UserDTO } from "../../user/dto/UserDTO";
import { IsNumber, IsObject, IsString } from "class-validator";

export class CustomerCreateOrUpdateDTO {
	@Expose()
	@IsNumber()
	private id: number | null;

	@Expose()
	@IsObject()
	private user: UserDTO | null;

	@Expose()
	@IsString()
	private email: string | null;

	constructor(id?: number, user?: UserDTO, email?: string) {
		this.id = id || null;
		this.user = user || null;
		this.email = email || null;
	}
}
