import { User } from "../entites/user.entity";
import bcrypt from "bcrypt";
import { IUserRepository } from "../repositories/Iuser.repository";
import { IUserService } from "./Iuser.service";
import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO";
import { UserDTO } from "../controllers/user/dto/UserDTO";
import { plainToInstance } from "class-transformer";

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

  async deleteOneById(id: number): Promise<boolean> {
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

  async findOneByEmail(email: string): Promise<UserDTO | null> {
		try {
			const foundUser = await this.userRepository.findOneByEmail(email);
			if (foundUser) {
				const dto = plainToInstance(UserDTO, foundUser);
				return dto;
			}
			return null;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

	async findOneById(id: number): Promise<UserDTO | null> {
		try {
			const foundUser = await this.userRepository.findOneById(id);
			if (foundUser) {
				const dto = new UserDTO(foundUser.id, foundUser.name, foundUser.email)
				return dto;
			}
			return null;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

  async updateUser(dto: UserCreateOrUpdateDTO): Promise<UserDTO | null> {
      try {
        const updatedUser = await this.userRepository.updateUser(dto);
        if(!updatedUser){
          throw new Error("Something went wrong while trying to update user") 
        }
        const userDto = plainToInstance(UserDTO, updatedUser);
        return userDto
      } catch (error:any) {
        throw new Error(error.message)
      }
  }

  async updatePassword(email: string, password: string): Promise<UserDTO | null> {
      try {
        const hash = await bcrypt.hash(password, 10);
        const foundUser = await this.userRepository.findOneByEmail(email);
        if(!foundUser){
          throw new Error("User not found")
        }
        foundUser.password_hash = hash;
        const updatedUser = await this.userRepository.updatePassword(foundUser);
        if(!updatedUser){
          throw new Error("Something went wrong while trying to update user") 
        }
        const userDto = plainToInstance(UserDTO, updatedUser);
        return userDto
      } catch (error:any) {
        throw new Error(error.message)
      }
  }
}
