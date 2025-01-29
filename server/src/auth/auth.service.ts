import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) { }
  private readonly googleClientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
  private client = new OAuth2Client(this.googleClientId);

  async verifyGoogleToken(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.googleClientId,
      });

      const payload = ticket.getPayload();

      return {
        success: true,
        user: {
          email: payload?.email,
          name: payload?.name,
          picture: payload?.picture,
        },
      };
    } catch (err) {
      console.error('Token verification failed:', err);
      return { success: false, message: 'Invalid token' };
    }
  }

  async validateUser(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}