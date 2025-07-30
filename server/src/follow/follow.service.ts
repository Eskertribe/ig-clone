import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Repository } from 'typeorm';
import { UserFollowerDto } from '../user/dto/user.dto';
import { User } from '../user/entity/user.entity';
import { UserFollower } from './entity/userfollower.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserFollower)
    private readonly userFollowerRepository: Repository<UserFollower>,
  ) {}

  async getFollowers(userId: UUID): Promise<UserFollowerDto[]> {
    const result = await this.userFollowerRepository.find({
      where: { userId },
      relations: { follower: true },
    });

    if (!result.length) {
      return [];
    }

    return Promise.all(result.map(({ follower }) => follower.toFollowerDto()));
  }

  async getFollowing(userId: UUID): Promise<UserFollowerDto[]> {
    const result = await this.userFollowerRepository.find({
      where: { followerId: userId },
      relations: { user: true },
    });

    if (!result.length) {
      return [];
    }

    return await Promise.all(result.map(({ user }) => user.toFollowerDto()));
  }

  async followUser(observer: UUID, username: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: observer } });

    if (!user) {
      throw new NotFoundException(`User with ID ${observer} not found`);
    }

    const targetUser = await this.userRepository.findOne({ where: { username } });

    if (!targetUser) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    // Check if already following
    const existingFollow = await this.userFollowerRepository.findOne({
      where: { userId: targetUser.id, followerId: observer },
    });

    if (existingFollow) {
      throw new BadRequestException(`You are already following ${username}`);
    }

    this.userFollowerRepository.insert({
      userId: targetUser.id,
      followerId: observer,
      user: targetUser,
      follower: user,
    });
  }

  async unfollowUser(observer: UUID, username: string): Promise<void> {
    const targetUser = await this.userRepository.findOne({ where: { username } });

    if (!targetUser) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    // Check if following
    const existingFollow = await this.userFollowerRepository.findOne({
      where: { userId: targetUser.id, followerId: observer },
    });

    if (!existingFollow) {
      return;
    }

    this.userFollowerRepository.delete(existingFollow);
  }
}
