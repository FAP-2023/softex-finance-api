import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AbstractEntity } from "./AbstractEntity";

@Entity("transactions")
export class Transaction extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  customer_id: number;

  @Column()
  amount: number;

  @Column()
  type: string;

  @Column()
  executed_at: Date;

  @Column()
  expected_at: Date;
}
