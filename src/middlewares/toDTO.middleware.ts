import { plainToClass, plainToInstance } from "class-transformer";
import { NextFunction, Response, Request } from "express";
import { UserCreateOrUpdateDTO } from "../controllers/user/dto/UserCreateOrUpdateDTO";
import { validate } from "class-validator";

export function toDtoContainer<T>(type: new () => T){
    async function toDTOMiddleware<T>(req:Request, res:Response, next:NextFunction){
        try {
            const userDTO = plainToClass(type, req.body, {excludeExtraneousValues: true})
            const errors = await validate(userDTO as any)
            if(errors.length > 0){
                throw new Error("Object not meeting requirement")
            }
            req.body = userDTO;
            next()
        } catch (error:any) {
            return res.status(400).json({
                message: "Something went wrong",
                error: error.message
            })
        }
    }
}