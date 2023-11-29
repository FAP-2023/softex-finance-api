import { Request, Response } from "express";
import { userService } from "../services/user.service";


class UserController {
    async createrUser(req: Request, res: Response){
        const { name, email, password } = req.body;
        console.log(req.body)
        try {
            
            const user = await userService.createUser(name, email, password);

            console.log(`User ${user.id} created`);
            return res.status(201).json({ ok: true, message: "Usuário criado com sucesso" });
        } catch (error) {
            return res.status(400).json({ message: "Erro ao criar usuário" });
        }
    }
}

export default new UserController();