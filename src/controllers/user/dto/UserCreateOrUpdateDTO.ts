import { IsNumber, IsString } from "class-validator";
import { User } from "../../../entites/user.entity";
import { Expose } from "class-transformer";
import bcrypt from 'bcrypt'

export class UserCreateOrUpdateDTO{
    @IsNumber()
    @Expose()
    id?:number;

    @IsString()
    @Expose()
    name:string;

    @IsString()
    @Expose()
    email:string

    @IsString()
    @Expose()
    password?:string;

    public async toEntity(dto:UserCreateOrUpdateDTO):Promise<User>{
        const hashedPassword = await bcrypt.hash(dto.password as string, 10);
        const user = new User(dto.email, hashedPassword, dto.name)
        return user;
    }
}