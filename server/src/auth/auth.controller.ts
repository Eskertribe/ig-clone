import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async googleAuth(@Req() req) {
    const { token } = req.body;

    return await this.authService.verifyGoogleToken(token);
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
  // @ApiResponse('token')
  async signup(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    if (!profilePicture) {
      throw new BadRequestException({ message: 'Profile picture is required' });
    }

    const user = await this.authService.signUp(createUserDto, profilePicture);
    const { token } = await this.authService.generateJwtToken(user);

    return { token, user };
  }

  @Post('login')
  // @ApiResponse('token', { token: String })
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.login(loginUserDto);

    if (!user) {
      throw new BadRequestException({ message: 'Invalid credentials' });
    }

    const { token } = await this.authService.generateJwtToken(user);

    return { user, token };
  }
}
