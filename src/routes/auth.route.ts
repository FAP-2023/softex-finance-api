import { Router } from "express";
import { authController } from "../controllers/auth.controller";
export function authRoutes(){
    const router = Router();
    router.post('/auth/login', authController.handleLogin)
    return router;
}