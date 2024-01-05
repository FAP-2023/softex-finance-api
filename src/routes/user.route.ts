import { Router } from "express";
import { userController } from "../factories/user.factory";
import checkAuthMiddleware from "../middlewares/checkAuth.middleware";
import { RequestLocals } from "../utils/RequestWithLocals";
import isRequestedUserMiddleware from "../middlewares/isRequestedUser.middleware";
import { toDtoContainer } from "../middlewares/toDTO.middleware";
import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO";

export const UserRoutes = (): Router => {
	const router = Router();

	router.post("/", (req, res) => userController.createrUser(req, res));
	router.get(
		"/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => isRequestedUserMiddleware(req, res, next),
		(req, res) => userController.getUserById(req, res)
	);
	router.get(
		"/:email",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => isRequestedUserMiddleware(req, res, next),
		(req, res) => userController.getUserByEmail(req, res)
	);
	router.put(
		"/",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => isRequestedUserMiddleware(req, res, next),
		(req, res, next) => toDtoContainer(UserCreateOrUpdateDTO),
		(req, res) => userController.updateUser(req, res)
	);
	router.delete(
		"/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => isRequestedUserMiddleware(req, res, next),
		(req, res) => userController.deleteUser(req, res)
	);
	return router;
};
