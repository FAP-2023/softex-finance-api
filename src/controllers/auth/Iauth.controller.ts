export interface IAuthController {
  handleLogin(req: Request, res: Response): Promise<void>;
}
