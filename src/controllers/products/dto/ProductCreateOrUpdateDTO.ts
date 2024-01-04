import { IsNotEmpty, IsNumber, IsOptional, IsString, isNotEmpty } from 'class-validator';

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

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

}