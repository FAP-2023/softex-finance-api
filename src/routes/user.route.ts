import { Router } from "express";
import { userController } from "../factories/user.factory";

export const UserRoutes = (): Router => {
	const router = Router();

	router.post("/", (req, res) => userController.createrUser(req, res));
	router.get("/:id", (req, res) => userController.getUserById(req, res));
    router.get("/:email", (req, res) => userController.getUserByEmail(req, res))
    router.put("/", (req, res) => userController.updateUser(req, res))
    router.delete("/:id", (req, res) => userController.deleteUser(req, res))
	return router;
};
