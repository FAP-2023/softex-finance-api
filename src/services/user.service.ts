import { User } from "../entites/user.entity";
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/user.repository";
import { IUserRepository } from "../repositories/Iuser.repository";
import { IUserService } from "./Iuser.service";

export class UserService implements IUserService {
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
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const foundUser = await this.userRepository.findOneByEmail(email);
      if (!foundUser) {
        throw new Error("User not found");
      }
      return foundUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id: number): Promise<boolean | null> {
      try {
        const didDelete = await this.userRepository.deleteOneById(id);
        if(!didDelete){
          throw new Error("Erro deletando usuário")
        }
        return true
      } catch (error:any) {
        throw new Error(error.message)
      }
  }
}
