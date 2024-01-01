export interface IAuthService {
  handleLogin(email: string, password: string): Promise<string>;
}
