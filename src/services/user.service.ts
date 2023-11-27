import { Repository } from "typeorm";
import { User } from "../entites/user.entity";



export class UserService {
    private userRepository: Repository<User>;
  
    async createUser(name: string, email: string, passwordHash: string): Promise<User> {
      const user = this.userRepository.create({
         name: name,
         email: email,
         password_hash: passwordHash,
        });
      return this.userRepository.save(user);
    }
  }