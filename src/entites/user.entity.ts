import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";


@Entity("users")
export class User extends AbstractEntity{

    constructor(email:string, password:string, name:string){
        super()
        this.name = name;
        this.email = email;
        this.password_hash = password;
    }

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
}

