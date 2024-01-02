import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO";
import { UserDTO } from "../controllers/user/dto/UserDTO";

export interface IAuthService {
  handleLogin(email: string, password: string): Promise<string>;
}
