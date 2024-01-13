import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { UserDTO } from '../../user/dto/UserDTO';

export class ProductCreateOrUpdateDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsObject()
    user:UserDTO;

    constructor(name: string, price: number, description: string, id: number, user: UserDTO) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.id = id;
        this.user=user
    }

}