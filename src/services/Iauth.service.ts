export interface IAuthService {
  handleLogin(email: string, password: string): Promise<string>;
  handleRequestPasswordReset(email: string): Promise<boolean>;
}
