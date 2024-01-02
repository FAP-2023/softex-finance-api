import { Request } from "express";

export interface RequestLocals extends Request{
    locals: any
}