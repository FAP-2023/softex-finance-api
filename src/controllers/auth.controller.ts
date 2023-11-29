import { Request, Response } from "express";
import { authService } from "../services/auth.service";
class AuthController{
    async handleLogin(req:Request, res:Response){
        try {
            const data = req.body;
            if(!data.email || !data.password){
                return res.sendStatus(400)
            }
            const token = await authService.handleLogin(data.email, data.password);
            if(token){
                return res.status(200).json({
                    token: token
                })
            }
            return res.sendStatus(400);
        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }
}

export const authController = new AuthController()