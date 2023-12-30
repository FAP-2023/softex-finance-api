import { Router } from "express";
import { authController } from "../factories/auth.factory";
export function authRoutes(){
    const router = Router();
    router.post('/auth/login', authController.handleLogin)
    return router;
}