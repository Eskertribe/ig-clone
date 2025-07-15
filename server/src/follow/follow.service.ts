import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { UserFollowerDto } from 'src/user/dto/user.dto';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getFollowers(userId: UUID): Promise<UserFollowerDto[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { followers: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const followers = await Promise.all(user.followers.map((follower) => follower.toFollowerDto()));

    return followers;
  }

  async getFollowing(userId: UUID): Promise<UserFollowerDto[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { following: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const following = await Promise.all(user.followers.map((follower) => follower.toFollowerDto()));

    return following;
  }
}
