import { Request, Response } from "express";


export interface ITransactionsController {
    getAllTransactions(req: Request, res: Response): void;
    getTransactionById(req: Request, res: Response): void;
    createTransaction(req: Request, res: Response): void;
    updateTransaction(req: Request, res: Response): void;
    deleteTransaction(req: Request, res: Response): void;
    findTransactionByUserId(req: Request, res: Response): void;
    countAllTransactionsByUserId(req: Request, res: Response): void;
}