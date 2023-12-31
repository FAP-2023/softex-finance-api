import { User } from "../entites/user.entity"

export interface IUserRepository{
    createUser(name:string, email:string, passwordHash:string):Promise<User>
    findOneByEmail(email:string):Promise<User|null>
}