export class HttpException extends Error {
    private statusCode: number;
    public message: string;
    constructor(statusCode:number, message:string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}