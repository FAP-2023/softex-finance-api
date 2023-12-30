import { Request, Response } from "express";
import { UserService } from "../services/user.service";


export class UserController {
    private userService:UserService;
    constructor(userService:UserService){
        this.userService = userService;
    }
    async createrUser(req: Request, res: Response){
        const { name, email, password } = req.body;
        console.log(req.body)
        try {
            
            const user = await this.userService.createUser(name, email, password);

            console.log(`User ${user.id} created`);
            return res.status(201).json({ ok: true, message: "Usuário criado com sucesso" });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar usuário" });
        }
    }
}