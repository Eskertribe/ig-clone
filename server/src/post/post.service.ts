import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User)
    private readonly postRepository: Repository<Post>,
  ) { }

  async createPost(file: File, postDto: CreatePostDto): Promise<{ valid: boolean, token?: string }> {
    const { description, user, disableComments, disableLikes } = postDto;

    const post = this.postRepository.create({
      description,
      user,
      disableComments,
      disableLikes
    });

    // TODO: Write file to disk

    await this.postRepository.save(post);

    return { valid: true, token: uuidv4() };
  }
}