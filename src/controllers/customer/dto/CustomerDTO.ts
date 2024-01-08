import { Expose } from "class-transformer";
import { UserDTO } from "../../user/dto/UserDTO";
import { IsNumber, IsObject, IsString } from "class-validator";

export class CustomerDTO{
    @Expose()
    @IsNumber()
    id: number | null;

    @Expose()
    @IsObject()
    user: UserDTO | null;
    
    @Expose()
    @IsString()
    email: string | null;

    public fromEntityToDTO(id: number, user: UserDTO, email: string): CustomerDTO {
        this.id = id;
        this.user = user;
        this.email = email;
        return this;
    } 
}