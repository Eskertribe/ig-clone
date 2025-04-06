import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { CreatePostRequest } from './post.types';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost({ file, post, user }: CreatePostRequest): Promise<Post> {
    const { description, disableComments, disableLikes } = post;

    return this.postRepository.save({
      description,
      user,
      disableComments,
      disableLikes,
      file: { name: file.filename, mimeType: file.mimetype },
    });
  }

  async getPosts(userId: string): Promise<Post[]> {
    return this.postRepository.find({
      where: { user: { id: userId }, deletedAt: IsNull() },
      relations: ['file'],
    });
  }
}
