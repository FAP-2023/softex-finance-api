import { User } from "../entites/user.entity";

export interface IAuthService {
  handleLogin(
    email: string,
    password: string,
  ): Promise<{ token: string; user: User }>;
  handleRequestPasswordReset(email: string): Promise<boolean>;
}
