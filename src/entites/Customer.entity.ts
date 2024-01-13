import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { ManyToOne } from "typeorm";
import { JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("customer")
export class Customer extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  email: string;

  @Column({type: "varchar", nullable: false, default: ""})
  name: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}