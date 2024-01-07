import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../repositories/Iuser.repository";
import { IAuthService } from "./Iauth.service";

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
					userId: foundUser.id,
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
}
