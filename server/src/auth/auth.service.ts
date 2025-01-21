import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto, SignUpDto } from './dto';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async login(loginDto: LoginDto): Promise<{ valid: boolean, token?: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return { valid: false }
    }

    const isPasswordValid = user.password === password; // TODO: A better hash comparison

    if (!isPasswordValid) {
      return { valid: false }
    }

    const token = uuidv4();

    return { valid: true, token };
  }

  async signUp(signUpDto: SignUpDto): Promise<any> { // TODO: Fix the return type
    const { username, email, password } = signUpDto;
    const user = this.userRepository.create({ email, username, password });

    await this.userRepository.save(user);

    return { message: 'Sign up successful', username };
  }
}