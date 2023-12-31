import { User } from "../entites/user.entity";

export interface IUserService {
  createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User | null>;
}
