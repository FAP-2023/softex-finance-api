import { NextFunction, Router, Request, Response } from "express";
import checkAuthMiddleware from "../middlewares/checkAuth.middleware";
import { customerController } from "../factories/customer.factory";
import { toDtoContainer } from "../middlewares/toDTO.middleware";
import { CustomerCreateOrUpdateDTO } from "../controllers/customer/dto/CustomerCreateOrUpdateDTO";
import isRequestedUserMiddleware from "../middlewares/isRequestedUser.middleware";
import { GlobalExceptionHandler } from "../middlewares/globalExceptionHandler";
import { HttpException } from "../utils/exceptions/HttpException";

export function customersRoutes() {
	const router = Router();
	router.get(
		"/",
		(req:Request, res:Response, next:NextFunction) => checkAuthMiddleware(req, res, next),
		(req:Request, res:Response, next:NextFunction) => customerController.getAll(req, res, next)
	);
	router.post(
		"/",
		(req:Request, res:Response, next:NextFunction) => checkAuthMiddleware(req, res, next),
		(req:Request, res:Response, next:NextFunction) =>
			toDtoContainer(CustomerCreateOrUpdateDTO)(req, res, next),
		(req:Request, res:Response, next:NextFunction) => customerController.create(req, res, next),
		(err:HttpException | any, req:Request, res:Response) => GlobalExceptionHandler.handle(err, req, res)
	);
	router.put(
		"/:id",
		(req:Request, res:Response, next:NextFunction) => checkAuthMiddleware(req, res, next),
		(req:Request, res:Response, next:NextFunction) =>
			toDtoContainer(CustomerCreateOrUpdateDTO)(req, res, next),
		(req:Request, res:Response, next:NextFunction) => customerController.update(req, res, next)
	);
	router.delete(
		"/:id",
		(req:Request, res:Response, next:NextFunction) => checkAuthMiddleware(req, res, next),
		(req:Request, res:Response, next:NextFunction) => isRequestedUserMiddleware(req, res, next),
		(req:Request, res:Response, next:NextFunction) => customerController.delete(req, res, next)
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
