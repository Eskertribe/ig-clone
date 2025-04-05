export class LoginDto {
  email: string;
  username?: string; // TODO: Accept either email or username when logging in
  password: string;
}
