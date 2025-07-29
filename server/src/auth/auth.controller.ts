import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto, LoginUserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async googleAuth(@Req() req) {
    const { token } = req.body;

    const { user, token: jwtToken } = await this.authService.verifyGoogleToken(token);

    return { user: user.toUserDto(), token: jwtToken };
  }

  @Post('signUp')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, profilePicture, cb) => {
          const uniqueSuffix = `${uuidv4()}${extname(profilePicture.originalname)}`;
          cb(null, uniqueSuffix);
        },
      }),
    }),
  )
  async signup(@UploadedFile() profilePicture: Express.Multer.File, @Body() body: any) {
    if (!profilePicture) {
      throw new BadRequestException({ message: 'Profile picture is required' });
    }

    const createUserDto: CreateUserDto = {
      email: body.email,
      username: body.username,
      password: body.password,
      name: body.name,
    };

    const user = await this.authService.signUp(createUserDto, profilePicture);
    const { token } = await this.authService.generateJwtToken(user);

    return { token, user };
  }

  @Post('login')
  async login(@Body() loginUserDto: any) {
    const user = await this.authService.login(loginUserDto);

    if (!user) {
      throw new BadRequestException({ message: 'Invalid credentials' });
    }

    const { token } = await this.authService.generateJwtToken(user);

    return { user, token };
  }
}
