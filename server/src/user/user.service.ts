import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserProfileDataDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserProfileDataById(userId: string): Promise<UserProfileDataDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['posts'],
      order: { posts: { createdAt: 'DESC' } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.toUserProfileDataDto();
  }
}
