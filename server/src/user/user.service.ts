import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { UserProfileDataDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserProfileDataByUsername(username: string): Promise<UserProfileDataDto> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: { followers: true, following: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.toUserProfileDataDto();
  }
}
