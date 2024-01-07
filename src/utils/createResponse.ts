import { Response } from "express";

export class CreateResponse {
    constructor() { }
    static sendResponse(res:Response, statusCode:number, message:string, data:any) {
        return res.status(statusCode).json({
            message: message,
            data: data
        });
    }
    static sendBasicResponse(res:Response, message:string) {
        return res.status(200).json({
            message: message
        });
    }
    static sendErrorResponse(res:Response, statusCode:number = 400, message:string) {
        return res.status(statusCode).json({
            message: message
        });
    }
}