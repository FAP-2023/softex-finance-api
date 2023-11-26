import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        nullable:false
    })
    name:string;

    @Column({
        unique:true,
        nullable:false
    })
    email:string;

    @Column({
        nullable:false
    })
    password_hash:string;

    @CreateDateColumn()
    created_at:Date;

    @DeleteDateColumn()
    deleted_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}

