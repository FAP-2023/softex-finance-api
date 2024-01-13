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
            return CreateResponse.sendResponse(res, 200, "Customer created", {});
        } catch (error:HttpException | any) {
            next(error.message);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction): Promise<Response | null | undefined> {
        try {
            const dto = req.body;
            const result = await this.customerService.update(dto);
            if(!result){
                return CreateResponse.sendErrorResponse(res, 400, "Customer not updated");
            }
            return CreateResponse.sendResponse(res, 200, "Customer updated", result);
        } catch (error:HttpException | any) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<Response | null | undefined> {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)){
                return CreateResponse.sendErrorResponse(res, 400, "Customer id is not a number");
            }
            const result = await this.customerService.delete(id);
            if(!result){
                return CreateResponse.sendErrorResponse(res, 400, "Customer not deleted");
            }
            return CreateResponse.sendBasicResponse(res, "Customer deleted");
        } catch (error:HttpException | any) {
            next(error);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction): Promise<Response | null | undefined> {
        try {
            const id = Number(req.params.id);
            if(isNaN(id)){
                return CreateResponse.sendErrorResponse(res, 400, "Customer id is not a number");
            }
            const result = await this.customerService.getById(id);
            if(!result){
                return CreateResponse.sendErrorResponse(res, 400, "Customer not found");
            }
            return CreateResponse.sendResponse(res, 200, "Customer found", result);
        } catch (error:HttpException | any) {
            next(error);
        }
    }

    public async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | null | undefined> {
        try {
            const result = await this.customerService.getAll();
            if(!result){
                return CreateResponse.sendErrorResponse(res, 400, "Customers not found");
            }
            return CreateResponse.sendResponse(res, 200, "Customers found", result);
        } catch (error:HttpException | any) {
            next(error);
        }
    }

    public async getCustomerByUserId(req: Request, res: Response, next: NextFunction): Promise<Response | null | undefined> {
        try {
            const userId = Number(req.params.userId);
            if(isNaN(userId)){
                return CreateResponse.sendErrorResponse(res, 400, "User id is not a number");
            }
            const result = await this.customerService.getCustomerByUserId(userId);
            if(!result){
                return CreateResponse.sendErrorResponse(res, 400, "Customer not found");
            }
            return CreateResponse.sendResponse(res, 200, "Customer found", result);
        } catch (error:HttpException | any) {
            next(error);
        }
    }
}