import { IsEmail, IsNumber, IsString } from "class-validator";
import { User } from "../../../entites/user.entity";
import { Expose } from "class-transformer";
import bcrypt from "bcrypt";

export class UserCreateOrUpdateDTO {
	@IsNumber()
	@Expose()
	id?: number;

	@IsString()
	@Expose()
	name: string;

	@IsString()
	@Expose()
	@IsEmail()
	email: string;

	@IsString()
	@Expose()
	password?: string;

	public async toEntity(dto: UserCreateOrUpdateDTO): Promise<User> {
		const hashedPassword = await bcrypt.hash(dto.password as string, 10);
		const user = new User(dto.email, hashedPassword, dto.name);
		return user;
	}

	constructor(name: string, email: string, password?: string, id?: number) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
