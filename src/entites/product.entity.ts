import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";


@Entity("products")
export class Product extends AbstractEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    title: string;

    @Column()
    price: number;
}