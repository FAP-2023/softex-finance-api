import { AuthController } from "../controllers/auth/auth.controller";
import { AuthService } from "../services/auth.service";
import { userRepository } from "./user.factory";
import { IUserRepository } from "../repositories/Iuser.repository";
import { IAuthService } from "../services/Iauth.service";

class AuthFactory {

  static createAuthService(userRepository:IUserRepository): AuthService {
    return new AuthService(userRepository)
  }

  static createAuthController(authService: IAuthService): AuthController {
    return new AuthController(authService);
  }
}

export const authService = AuthFactory.createAuthService(userRepository);
export const authController = AuthFactory.createAuthController(authService);
