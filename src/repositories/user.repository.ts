import { Repository } from "typeorm";
import { User } from "../entites/user.entity";
import { IUserRepository } from "./Iuser.repository";

export class UserRepository implements IUserRepository{
    private repository:Repository<User>
    constructor(repository:Repository<User>){
        this.repository = repository;
    }

    public async createUser(name:string, email:string, passwordHash:string):Promise<User>{
        try {
            const user = new User(email, passwordHash, name)
            const createdUser = await this.repository.save(user);
            return user;
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    public async findOneByEmail(email:string):Promise<User|null>{
        try {
            const user = await this.repository.findOne({
                where:{
                    email:email
                }
            })
            return user;
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}