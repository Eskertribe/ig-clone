import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    console.log(`Username: ${username}, Password: ${password}`);
    return { message: 'Login successful', username };
  }
}