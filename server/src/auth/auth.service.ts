import { Injectable } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto): Promise<any> { // TODO: Fix the return type
    const { email, password } = loginDto;
    console.log(`email: ${email}, Password: ${password}`);

    return { message: 'Login successful', email };
  }

  async signUp(signUpDto: SignUpDto): Promise<any> {
    const { username, email, password } = signUpDto;
    console.log(`Username: ${username}, Password: ${password}, Email: ${email}`);

    return { message: 'Sign up successful', username };
  }
}