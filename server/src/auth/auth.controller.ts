import { Controller, Get, Post, Req, Res, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('google')
  async googleAuth(@Req() req) {
    const { token } = req.body;

    return await this.authService.verifyGoogleToken(token);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signup(createUserDto);
    const { token } = await this.authService.generateJwtToken(user);

    return { user, token };
  }

  @Post('login')
  async login(@Body() loginUserDto: CreateUserDto) {
    const user = await this.authService.login(loginUserDto);
    const { token } = await this.authService.generateJwtToken(user);

    return { user, token };
  }
}