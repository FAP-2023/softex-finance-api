import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class TransactionCreateOrUpdateDTO {
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsObject()
    user_id: number;

    constructor(amount: number, type: string, id: number, user_id: number) {
        this.amount = amount;
        this.type = type;
        this.id = id;
        this.user_id = user_id;
    }

}