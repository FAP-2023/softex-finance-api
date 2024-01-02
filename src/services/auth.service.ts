import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../repositories/Iuser.repository";
import { IAuthService } from "./Iauth.service";
import { UserDTO } from "../controllers/user/dto/UserDTO";
import { instanceToInstance, plainToInstance } from "class-transformer";
import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO";

export class AuthService implements IAuthService {
	private userRepository;

	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	async handleLogin(email: string, password: string): Promise<string> {
		try {
			const foundUser = await this.userRepository.findOneByEmail(email);

			if (!foundUser) {
				throw new Error("User not found");
			}

			const passwordComparing = await bcrypt.compare(
				password,
				foundUser.password_hash
			);
			if (!passwordComparing) {
				throw new Error("Passwords dont match");
			}
			const token = jwt.sign(
				{
					user: {
						id: foundUser.id,
					},
				},
				process.env.JWT_SECRET as string,
				{ expiresIn: 60 * 60 }
			);
			if (!token) {
				throw new Error("Something went wrong with the token");
			}
			return token;
		} catch (error: any) {
			return error.message;
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
				const dto = plainToInstance(UserDTO, foundUser);
				return dto;
			}
			return null;
		} catch (error: any) {
			throw new Error(error.message);
		}
	}

  async deleteOneById(id: number): Promise<boolean> {
      try {
        const isDeleted = await this.userRepository.deleteOneById(id);
        if(isDeleted){
          return true
        }
        return false
      } catch (error:any) {
        throw new Error(error.message)
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
}
