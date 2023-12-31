import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { ManyToOne } from "typeorm";
import { JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Customer } from "./Customers.entity";

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

  @Column({ type: "varchar" })
  type: string;

  @Column({ type: "timestamp" })
  executed_at: Date;

  @Column({ type: "timestamp", nullable: true })
  expected_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;
}