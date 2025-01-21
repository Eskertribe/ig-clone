import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto);

    if (result) {
      res.cookie('auth-cookie', result.token, { httpOnly: false, maxAge: 3600000, sameSite: 'lax' }); // 1 hour

      return res.json(result);
    }

    return res.status(401).json({ message: 'Unauthorized' });
  }

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}