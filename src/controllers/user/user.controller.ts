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
        try {
            const id = Number(req.params.id);
            if(isNaN(id)){
                throw new Error("Parameter should be a number")
            }
            const user = await this.userService.findOneById(id);
            if(!user){
                throw new Error("Error fetching user")
            }
            return res.status(200).json({
                data:{
                    user:user
                }
            })
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
    async getUserByEmail(req:Request, res:Response){
        try {
            const email = req.params.email;
            const user = await this.userService.findOneByEmail(email);
            if(!user){
                throw new Error("Error fetching user")
            }
            return res.status(200).json({
                data:{
                    user:user
                }
            })
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
    async updateUser(req:Request, res:Response){
        try {
            const dto = req.body;
            const user = this.userService.updateUser(dto)
            if(!user){
                throw new Error("Error while updating user")
            }
            return res.status(200).json({
                data:{
                    user:user
                }
            })
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
    async deleteUser(req:Request, res:Response){
        try {
            const id = Number(req.params.id);
            if(isNaN(id)){
                throw new Error("Id must be a number")
            }
            const user = this.userService.deleteOneById(id)
            if(!user){
                throw new Error("Error while deleting user")
            }
            return res.status(200).json({
                data:{
                    user:user
                }
            })
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            })
        }
    }

    async updatePassword(req:Request, res:Response){
        try {
            const email = req?.body?.email;
            if(!email){
                throw new Error("Email is required")
            }
            const password = req.body.password;
            const user = await this.userService.updatePassword(email, password)
            if(!user){
                throw new Error("Error while updating password")
            }
            return res.sendStatus(200);
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            })
        }
    }
}