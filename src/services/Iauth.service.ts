import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO";
import { UserDTO } from "../controllers/user/dto/UserDTO";

export interface IAuthService {
  handleLogin(email: string, password: string): Promise<string>;
  findOneByEmail(email:string):Promise<UserDTO | null>
  findOneById(id:number):Promise<UserDTO|null>
  deleteOneById(id:number):Promise<boolean>
  updateUser(dto:UserCreateOrUpdateDTO):Promise<UserDTO|null>
}
