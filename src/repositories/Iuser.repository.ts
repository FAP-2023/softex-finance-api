import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO"
import { User } from "../entites/user.entity"

export interface IUserRepository{
    createUser(name:string, email:string, passwordHash:string):Promise<User>
    findOneByEmail(email:string):Promise<User|null>
    deleteOneById(id:number):Promise<boolean|null>
    findOneById(id:number):Promise<User|null>
    updateUser(dto:UserCreateOrUpdateDTO):Promise<User|null>
    updatePassword(userObject:User):Promise<User|null>
}