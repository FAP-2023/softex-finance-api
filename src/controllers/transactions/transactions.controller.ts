import { ITransactionsService } from "../../services/Itransactions.service";
import { ITransactionsController } from "./Itransactions.controller";
import { Request, Response } from "express";


export class TransactionController implements ITransactionsController {
    private transactionService:ITransactionsService
    constructor(transactionService:ITransactionsService){
        this.transactionService = transactionService;
    }

    async createTransaction(req: Request, res: Response) {
        const transactionDTO = req.body;
        try {
            const transaction = await this.transactionService.createTransaction(transactionDTO);
            if(!transaction){
                return res.sendStatus(400);
            }
            return res.status(201).json({ ok: true, message: "Transação criada com sucesso" });
        } catch (error:any) {
            console.log(error.message)
            return res.status(400).json({ message: "Erro ao criar transação" });
        }
    }

    async deleteTransaction(req: Request, res: Response) {
        const id = Number(req.params.id);
        try {
            await this.transactionService.deleteTransaction(id);
            return res.status(200).json({ ok: true, message: "Transação deletada com sucesso" });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao deletar transação" });
        }
    }

    async getAllTransactions(req: Request, res: Response) {
        try {
            const transactions = await this.transactionService.getAllTransactions();
            return res.status(200).json({ ok: true, transactions });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao buscar transação" });
        }
    }
    
    async getTransactionById(req: Request, res: Response) {
        const id = Number(req.params.id);
        try {
            const transaction = await this.transactionService.getTransactionById(id);
            if(!transaction){
                return res.sendStatus(400);
            }
            return res.status(200).json({ ok: true, transaction });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao buscar transação" });
        }
    }

    async updateTransaction(req: Request, res: Response) {
        const transactionDTO = req.body;
        try {
            await this.transactionService.updateTransaction(transactionDTO);
            return res.status(200).json({ ok: true, message: "Transação atualizada com sucesso" });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao atualizar transação" });
        }
    }

    async findTransactionByUserId(req: Request, res: Response) {
        const id = Number(req.locals.userId);
        if(!id){
            return res.status(400).json({ message: "Id não informado" });
        }
        try {
            const transactions = await this.transactionService.findTransactionByUserId(id);
            return res.status(200).json({ ok: true, transactions });
        } catch (error:any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async countAllTransactionsByUserId(req: Request, res: Response){
        const id = Number(req?.locals?.userId);
        if(!id){
            return res.status(400).json({ message: "Id não informado" });
        }
        try {
            const count = await this.transactionService.countAllTransactionsByUserId(id);
            return res.status(200).json({ ok: true, count });
        } catch (error:any) {
            return res.status(400).json({ message: error.message });
        }
    }
}