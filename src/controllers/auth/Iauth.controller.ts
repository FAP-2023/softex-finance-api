import { Request, Response } from "express";

export interface IAuthController {
  handleLogin(req: Request, res: Response): Promise<Response>;
  handleResetPassword(req: Request, res: Response): Promise<Response>;
}
