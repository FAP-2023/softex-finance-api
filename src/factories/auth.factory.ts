import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { userRepository } from "./user.factory";
function authFactory() {
  const authService = new AuthService(userRepository);
  const authController = new AuthController(authService);
  return {
    service: authService,
    controller: authController,
  };
}

const authModule = authFactory();
export const authService = authModule.service;
export const authController = authModule.controller;