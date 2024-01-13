import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransactionCreateOrUpdateDTO {
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsNumber()
    customer_id:number

    @IsDate()
    executed_at?: Date;

    @IsNumber()
    product_id?: number;

    constructor(amount: number, type: string, id: number, user_id: number, customer_id: number, executed_at?: Date, product_id?: number) {
        this.amount = amount;
        this.type = type;
        this.id = id;
        this.user_id = user_id;
        this.customer_id = customer_id;
        this.executed_at = executed_at;
        this.product_id = product_id;
    }

}