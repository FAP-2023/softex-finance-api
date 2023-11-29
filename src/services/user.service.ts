import { User } from "../entites/user.entity";
import bcrypt from 'bcrypt'
import { AppDataSource } from "./database/app-data-source";



export class UserService {
    private userRepository;
    constructor(){
      this.userRepository = AppDataSource.getRepository(User);
    }
    async createUser(name: string, email: string, password: string): Promise<User> {
      const hash = await bcrypt.hash(password, 10);
      const user = await this.userRepository.create({
         name: name,
         email: email,
         password_hash: hash,
        });
      return this.userRepository.save(user);
    }
  }

  export const userService = new UserService();