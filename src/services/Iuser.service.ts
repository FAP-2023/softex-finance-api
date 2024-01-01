import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO";
import { User } from "../entites/user.entity";

export interface IUserService {
  createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User | null>;

  getUserByEmail(email:string):Promise<User | null>;
  deleteUser(id:number):Promise<boolean|null>
}
