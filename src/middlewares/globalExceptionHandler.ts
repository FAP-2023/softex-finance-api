import { HttpException } from "../utils/exceptions/HttpException";

export class GlobalExceptionHandler{
    public static async handle(error: HttpException | any, req: any, res: any): Promise<any> {
        if(error){
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    }
}