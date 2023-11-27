import { Request, Response } from "express";
import { UserService } from "../services/user.service";


class UserController {
    async createrUser(req: Request, res: Response){
        const { name, email, password_hash } = req.body;
        try {
            const userService = new UserService();
            
            const user = await userService.createUser(name, email, password_hash);

            console.log(`User ${user.id} created`);
            res.status(201).json({ ok: true, message: "Usuário criado com sucesso" });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar usuário" });
        }
    }
}

export default new UserController();