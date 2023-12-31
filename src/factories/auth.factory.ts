import { AuthController } from "../controllers/auth/auth.controller";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { userRepository } from "./user.factory";

class AuthFactory {

  static createAuthService(userRepository:UserRepository): AuthService {
    return new AuthService(userRepository)
  }

  static createAuthController(authService: AuthService): AuthController {
    return new AuthController(authService);
  }
}
export const authService = AuthFactory.createAuthService(userRepository);
export const authController = AuthFactory.createAuthController(authService);
