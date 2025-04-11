import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto, UserDto } from '../user/dto/user.dto';
import { User } from '../user/entity/user.entity';
import { UUID } from 'crypto';

@Injectable()
export class AuthService {
  private client: OAuth2Client;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyGoogleToken(token: string) {
    if (!token) {
      throw new ForbiddenException('Token is required');
    }

    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new ForbiddenException('Invalid token payload');
    }

    const { email, name } = payload;

    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      user = this.userRepository.create({
        email,
        username: name,
      });
      await this.userRepository.save(user);
    }

    const jwtToken = this.jwtService.sign(
      { email: user.email, userId: user.id },
      { secret: process.env.JWT_SECRET },
    );

    return { user, token: jwtToken };
  }

  async signUp(
    createUserDto: CreateUserDto,
    profilePicture: Express.Multer.File,
  ): Promise<UserDto> {
    const { email: newEmail, password, username: newUserName } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email: newEmail,
      password: hashedPassword,
      username: newUserName,
      profilePicture: { name: profilePicture.filename, mimeType: profilePicture.mimetype },
    });
    const user = await this.userRepository.save(newUser);

    return user.toUserDto();
  }

  async login(loginUserDto: LoginUserDto): Promise<UserDto> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password ?? '');

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }

  async generateJwtToken(user: UserDto) {
    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  async validateUser(userId: UUID): Promise<User | null> {
    if (!userId) {
      throw new UnauthorizedException();
    }

    return this.userRepository.findOne({ where: { id: userId } });
  }

  async createUser(user: CreateUserDto): Promise<UserDto> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  // TODO: Fix the profile type
  async validateGoogleUser(profile: any): Promise<User> {
    const { id, emails, displayName } = profile;
    const email = emails[0].value;

    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      user = this.userRepository.create({
        email,
        username: displayName,
      });
      await this.userRepository.save(user);
    }

    return user;
  }
}
