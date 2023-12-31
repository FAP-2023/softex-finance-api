import { User } from "../entites/user.entity";
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { IUserRepository } from "../repositories/Iuser.repository";

export class UserService {
  private userRepository;
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const hash = await bcrypt.hash(password, 10);
      const user = await this.userRepository.createUser(name, email, hash);
      return user;
    } catch (error:any) {
      throw new Error(error.message)
    }
  }
}
