import { Router } from "express";
import { authController } from "../factories/auth.factory";
export function authRoutes() {
	const router = Router();
	router.post("/login", (req, res) => authController.handleLogin(req, res));
	router.post("/password/reset", (req, res) =>
		authController.handleResetPassword(req, res)
	);
	return router;
}
