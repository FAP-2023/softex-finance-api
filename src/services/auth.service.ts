import { User } from "../entites/user.entity";
import { AppDataSource } from "./database/app-data-source";
import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

class AuthService {
	private userRepository;

	constructor() {
		this.userRepository = AppDataSource.getRepository(User);
	}

	async handleLogin(email: string, password: string) {
		try {
			const foundUser = await this.userRepository.findOne({
				where: {
					email: email,
				},
			});

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
			const token = await jwt.sign(
				{
					user: {
						id: foundUser.id,
					},
				},
				process.env.JWT_SECRET as string,
				{ expiresIn: 60 * 60 }
			);
            if(!token){
                throw new Error('Something went wrong with the token')
            }
            return token;
		} catch (error) {
			return error;
		}
	}
}


export const authService = new AuthService();