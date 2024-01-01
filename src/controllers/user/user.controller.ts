import { Request, Response } from "express";
import { IUserController } from "./Iuser.controller";
import { IUserService } from "../../services/Iuser.service";


export class UserController implements IUserController {
    private userService:IUserService;
    constructor(userService:IUserService){
        this.userService = userService;
    }
    async createrUser(req: Request, res: Response){
        const { name, email, password } = req.body;
        try {
            const user = await this.userService.createUser(name, email, password);
            if(!user){
                return res.sendStatus(400);
            }
            return res.status(201).json({ ok: true, message: "Usuário criado com sucesso" });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar usuário" });
        }
    }
    async getUserById(req:Request, res:Response){
        return res.sendStatus(200)
    }
    async getUserByEmail(req:Request, res:Response){
        return res.sendStatus(200)
    }
    async updateUser(req:Request, res:Response){
        return res.sendStatus(200)
    }
    async deleteUser(req:Request, res:Response){
        return res.sendStatus(200)
    }
}