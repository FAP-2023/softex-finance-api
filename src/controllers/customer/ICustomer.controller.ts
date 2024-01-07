import { NextFunction, Request, Response } from "express";

export interface ICustomerController {
	create(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | null | undefined>;
	update(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | null | undefined>;
	delete(req: Request, res: Response, next: NextFunction): Promise<boolean>;
	getById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | null | undefined>;
	getAll(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | null | undefined>;
	getCustomerByUserId(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<Response | null | undefined>;
}
