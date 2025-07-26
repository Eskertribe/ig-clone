import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfileDataDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserProfileDataByUsername(
    username: string,
    observer: string,
  ): Promise<UserProfileDataDto> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: { followers: true, following: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the observer is following the user
    const isFollowing = user.followers.some((follow) => follow.followerId === observer);

    return user.toUserProfileDataDto(isFollowing);
  }

  async findUserByQuery(query: string, observerUserName: string): Promise<UserProfileDataDto[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profilePicture', 'profilePicture')
      .select(['user.id', 'user.username', 'user.name', 'profilePicture'])
      .where('(user.username ILIKE :query OR user.name ILIKE :query)', { query: `%${query}%` })
      .andWhere('user.username != :observerUserName AND user.name != :observerUserName', {
        observerUserName,
      })
      .getMany();

    return Promise.all(users.map((user) => user.toUserProfileDataDto()));
  }
}
