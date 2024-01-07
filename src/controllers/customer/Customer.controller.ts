import { ICustomerController } from "./ICustomer.controller";
import { ICustomerService } from "../../services/Icustomer.service";
import { HttpException } from "../../utils/exceptions/HttpException";
import { CreateResponse } from "../../utils/createResponse";
import { Response, Request, NextFunction } from "express";

export class CustomerController implements ICustomerController{
    private customerService: ICustomerService;
    constructor(customerService: ICustomerService){
        this.customerService = customerService;
    }
    public async create(req: Request, res: Response, next: NextFunction): Promise<Response | null | undefined> {
        try {
            const dto = req.body;
            const result = await this.customerService.create(dto);
            if(!result){
                return CreateResponse.sendErrorResponse(res, 400, "Customer not created");
            }
            return CreateResponse.sendResponse(res, 200, "Customer created", result);
        } catch (error:HttpException | any) {
            next(error);
        }
    }
}