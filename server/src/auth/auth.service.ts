import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, SignUpDto } from './dto';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async login(loginDto: LoginDto): Promise<any> { // TODO: Fix the return type
    const { email, password } = loginDto;
    console.log(`email: ${email}, Password: ${password}`);

    return { message: 'Login successful', email };
  }

  async signUp(signUpDto: SignUpDto): Promise<any> { // TODO: Fix the return type
    const { username, email, password } = signUpDto;
    const user = this.userRepository.create({ email, username, password });

    await this.userRepository.save(user);

    return { message: 'Sign up successful', username };
  }
}