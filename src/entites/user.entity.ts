import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Customer } from "./Customer.entity";

@Entity("users")
export class User extends AbstractEntity {
	constructor(email: string, password: string, name: string) {
		super();
		this.name = name;
		this.email = email;
		this.password_hash = password;
	}

	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		nullable: false,
	})
	name: string;

	@Column({
		unique: true,
		nullable: false,
	})
	email: string;

	@Column({
		nullable: false,
	})
	password_hash: string;

	@OneToMany(() => Customer, (customer) => customer.user, {
		cascade: true,
		onDelete: "CASCADE",
	})
	customers: Customer[];
}
