import { Request, Response } from "express"
export interface IUserController{
    createrUser(req:Request, res:Response):Promise<Response>
    getUserById(req:Request, res:Response):Promise<Response>
    getUserByEmail(req:Request, res:Response):Promise<Response>
    updateUser(req:Request, res:Response):Promise<Response>
    deleteUser(req:Request, res:Response):Promise<Response>
}