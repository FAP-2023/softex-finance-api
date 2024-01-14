import { Router } from "express";
import checkAuthMiddleware from "../middlewares/checkAuth.middleware";
import { transactionsController } from "../factories/transactions.factory";
import { toDtoContainer } from "../middlewares/toDTO.middleware";
import { TransactionCreateOrUpdateDTO } from "../controllers/transactions/dto/TransactionCreateOrUpdateDTO";


export function TransactionsRoutes() {
    const router = Router();
    router.post(
        "/",
        (req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => toDtoContainer(TransactionCreateOrUpdateDTO)(req, res, next),
        (req, res) => transactionsController.createTransaction(req, res)
    );
    router.get(
		"/",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res) => transactionsController.findTransactionByUserId(req, res)
	);
    router.get(
		"/getById/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res) => transactionsController.getTransactionById(req, res)
	);
    router.put(
		"/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res, next) => toDtoContainer(TransactionCreateOrUpdateDTO)(req, res, next),
		(req, res) => transactionsController.updateTransaction(req, res)
	);
    router.delete(
		"/:id",
		(req, res, next) => checkAuthMiddleware(req, res, next),
		(req, res) => transactionsController.deleteTransaction(req, res)
	);
	router.get("/countAll", (req, res, next) => checkAuthMiddleware(req, res, next), (req, res) => transactionsController.countAllTransactionsByUserId(req, res))
	return router;
}