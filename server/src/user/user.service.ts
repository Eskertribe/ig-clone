import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserProfileDataById(userId: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['posts'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user?.toUserProfileDataDto();
  }
}
