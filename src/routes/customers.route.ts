import { Router } from "express";
import checkAuthMiddleware from "../middlewares/checkAuth.middleware";
import { CustomerController } from "../controllers/customer/Customer.controller";
import { customerController } from "../factories/customer.factory";
import { toDtoContainer } from "../middlewares/toDTO.middleware";
import { CustomerCreateOrUpdateDTO } from "../controllers/customer/dto/CustomerCreateOrUpdateDTO";
import isRequestedUserMiddleware from "../middlewares/isRequestedUser.middleware";

export function customersRoutes() {
	const router = Router();
	router.get(
		"/",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => customerController.getAll(req, res, next)
	);
	router.post(
		"/",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) =>
			toDtoContainer(CustomerCreateOrUpdateDTO)(req, res, next),
		(req, res, next) => customerController.create(req, res, next)
	);
	router.put(
		"/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) =>
			toDtoContainer(CustomerCreateOrUpdateDTO)(req, res, next),
		(req, res, next) => customerController.update(req, res, next)
	);
	router.delete(
		"/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => isRequestedUserMiddleware(req, res, next),
		(req, res, next) => customerController.delete(req, res, next)
	);
	router.get(
		"/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => customerController.getById(req, res, next)
	);
	router.get(
		"/getCustomerByUserId/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
        (req, res, next) => isRequestedUserMiddleware(req, res, next),
		(req, res, next) =>
			customerController.getCustomerByUserId(req, res, next)
	);
	return router;
}
