import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { ManyToOne } from "typeorm";
import { JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Customer } from "./Customer.entity";
import { Product } from "./product.entity";

enum TransactionType {
	IN = 'in',
	OUT = 'out'
}

// Modelo para a tabela 'transactions'
@Entity("transactions")
export class Transaction extends AbstractEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: "integer" })
	user_id: number;

	@Column({ type: "integer" })
	customer_id: number;

	@Column({ type: "float" })
	amount: number;

	@Column({ type: "enum", enum: TransactionType, default: TransactionType.IN, nullable: false })
	type: TransactionType;

	@Column({ type: "timestamp", nullable: true })
	executed_at: Date;

	@Column({ type: "timestamp", nullable: true })
	expected_at: Date;

	@ManyToOne(() => User, {
		cascade: true,
	})
	@JoinColumn({ name: "user_id" })
	user: User;

	@ManyToOne(() => Customer, {
		cascade: true,
	})
	@JoinColumn({ name: "customer_id" })
	customer: Customer;

	@ManyToOne(() => Product, {
		cascade: true,
	})
	@JoinColumn({ name: "product_id" })
	product: Product;
}
