import { User } from "../entites/user.entity";
import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO";
import { UserDTO } from "../controllers/user/dto/UserDTO";

export interface IUserService {
  createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User | null>;

  findOneByEmail(email:string):Promise<UserDTO | null>
  findOneById(id:number):Promise<UserDTO|null>
  deleteOneById(id:number):Promise<boolean>
  updateUser(dto:UserCreateOrUpdateDTO):Promise<UserDTO|null>
}
