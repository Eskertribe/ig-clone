import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
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

    console.log(user);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if the observer is following the user
    const isFollowing = user.followers.some((follow) => follow.followerId === observer);

    return user.toUserProfileDataDto(isFollowing);
  }

  async findUserByQuery(query: string): Promise<UserProfileDataDto[]> {
    const users = await this.userRepository.find({
      where: [{ username: ILike(`%${query}%`) }, { name: ILike(`%${query}%`) }],
    });

    return Promise.all(users.map((user) => user.toUserProfileDataDto()));
  }
}
