import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../repositories/Iuser.repository";
import { IAuthService } from "./Iauth.service";
import transporter from "../utils/services/mailer";

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

	async handleRequestPasswordReset(email: string): Promise<boolean> {
		try {
			const foundUser = await this.userRepository.findOneByEmail(email);
			if (!foundUser) {
				throw new Error("User not found");
			}

			const token = jwt.sign(
				{
					email: foundUser.email,
				},
				process.env.JWT_SECRET as string,
				{ expiresIn: 60 * 10 }
			);
			if (!token) {
				throw new Error("Something went wrong with the token");
			}
			// Send email with token
			const info = await transporter.sendMail({
				from: `${process.env.SMTP_USER}`, // sender address
				to: email, // list of receivers
				subject: "password redefine link", // Subject line
				text: "This is the link to redefine your password", // plain text body
				html: `${process.env.MAILER_URL}/password/reset/${token}`, // html body
			});
			if (!info) {
				throw new Error("Error sending email");
			}
			return true;
		} catch (error: any) {
			return error.message;
		}
	}
}
