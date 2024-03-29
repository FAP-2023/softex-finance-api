import { Router } from "express";
import { userController } from "../factories/user.factory";
import checkAuthMiddleware from "../middlewares/checkAuth.middleware";
import isRequestedUserMiddleware from "../middlewares/isRequestedUser.middleware";
import { toDtoContainer } from "../middlewares/toDTO.middleware";
import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO";
import checkMagicLinkToken from "../middlewares/checkMagicLinkToken";

export const UserRoutes = (): Router => {
	const router = Router();

	router.post(
		"/",
		(req, res, next) =>
			toDtoContainer(UserCreateOrUpdateDTO)(req, res, next),
		(req, res) => userController.createrUser(req, res)
	);
	router.get(
		"/get/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => isRequestedUserMiddleware(req, res, next),
		(req, res) => userController.getUserById(req, res)
	);
	router.get(
		"/getByEmail/:email",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => isRequestedUserMiddleware(req, res, next),
		(req, res) => userController.getUserByEmail(req, res)
	);
	router.put(
		"/",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => isRequestedUserMiddleware(req, res, next),
		(req, res, next) =>
			toDtoContainer(UserCreateOrUpdateDTO)(req, res, next),
		(req, res) => userController.updateUser(req, res)
	);
	router.delete(
		"/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => isRequestedUserMiddleware(req, res, next),
		(req, res) => userController.deleteUser(req, res)
	);
	router.put("/password/reset/:token", checkMagicLinkToken, (req, res) =>
		userController.updatePassword(req, res)
	);
	return router;
};
