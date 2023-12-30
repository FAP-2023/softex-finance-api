import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
export class AuthController{
    private authService:AuthService
    constructor(authService:AuthService){
        this.authService = authService;
    }
    async handleLogin(req:Request, res:Response){
        try {
            const data = req.body;
            if(!data.email || !data.password){
                return res.sendStatus(400)
            }
            const token = await this.authService.handleLogin(data.email, data.password);
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