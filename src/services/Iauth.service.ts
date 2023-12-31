import { User } from "../entites/user.entity";

export interface IAuthService {
  handleLogin(email: string, password: string): Promise<string>;
}
