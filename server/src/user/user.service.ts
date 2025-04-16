import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserProfileDataDto } from './dto/user.dto';
import { UUID } from 'crypto';
import { join } from 'path';
import { readFile } from 'fs/promises';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserProfileDataById(userId: UUID): Promise<UserProfileDataDto> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['posts', 'posts.comments', 'posts.comments.user', 'posts.user', 'posts.file'],
      order: { posts: { createdAt: 'DESC' } },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // TODO: Refactor
    const filePath = join(__dirname, '..', '..', 'uploads', user.profilePicture.name);
    const imageBuffer = await readFile(filePath);
    const profilePicture = imageBuffer.toString('base64');
    const { posts } = user;

    const postDtos = await Promise.all(
      (posts ?? []).map(async (post) => {
        const file = post.file;
        const filePath = join(__dirname, '..', '..', 'uploads', file.name);
        const imageBuffer = await readFile(filePath);
        const base64Image = imageBuffer.toString('base64');

        return post.toDto(
          {
            id: file.id,
            image: `data:${file.mimeType};base64,${base64Image}`,
          },
          post.user.toCommentDto({
            id: post.user.profilePicture.id,
            image: `data:image/png;base64,${profilePicture}`,
          }),
        );
      }),
    );
    const userDto = user.toUserProfileDataDto(postDtos);

    userDto.profilePicture = {
      id: user.profilePicture.id,
      image: `data:image/png;base64,${profilePicture}`,
    };

    return userDto;
  }
}
