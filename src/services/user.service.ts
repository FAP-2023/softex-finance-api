import { User } from "../entites/user.entity";
import bcrypt from 'bcrypt'
import { UserRepository } from "../repositories/user.repository";


export class UserService {
    private userRepository;
    constructor(userRepository:UserRepository){
      this.userRepository = userRepository;
    }
    async createUser(name: string, email: string, password: string): Promise<User> {
      const hash = await bcrypt.hash(password, 10);
      const user = await this.userRepository.createUser(name, email, hash);
      return user;
    }
  }