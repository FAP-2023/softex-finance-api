import { Request, Response } from "express";
import { IAuthService } from "../../services/Iauth.service";
import { IAuthController } from "./Iauth.controller";
export class AuthController implements IAuthController {
  private authService: IAuthService;
  constructor(authService: IAuthService) {
    this.authService = authService;
  }
  async handleLogin(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!data.email || !data.password) {
        return res.sendStatus(400);
      }
      const { token, user } = await this.authService.handleLogin(
        data.email,
        data.password,
      );
      if (token) {
        return res.status(200).json({
          token: token,
          user: { id: user.id },
        });
      }
      return res.sendStatus(400);
    } catch (error: any) {
      console.log(error.message);
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async handleResetPassword(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!data.email) {
        return res.sendStatus(400);
      }
      const token = await this.authService.handleRequestPasswordReset(
        data.email,
      );
      if (!token) {
        throw new Error("Error generating token");
      }
      return res.status(200).json({
        message: "Email sent",
      });
    } catch (error) {
      return res.status(400).json({
        message: error,
      });
    }
  }
}
