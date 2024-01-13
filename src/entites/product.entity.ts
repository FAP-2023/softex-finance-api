import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { ManyToOne } from "typeorm";
import { JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("products")
export class Product extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  image: string;

  @Column({ type: "float" })
  price: number;
}

