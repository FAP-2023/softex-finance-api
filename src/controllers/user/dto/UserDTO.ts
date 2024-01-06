import { IsEmail, IsNumber, IsString } from "class-validator";

export class UserDTO {
	@IsNumber()
	id: number;

	@IsString()
	name: string;

	@IsString()
	@IsEmail()
	email: string;
	constructor(id: number, name: string, email: string) {
		this.id = id;
		this.name = name;
		this.email = email;
	}
}
