export interface IAuthController {
  handleLogin(req: Request, res: Response): Promise<void>;
  handleResetPassword(req: Request, res: Response): Promise<void>;
}
