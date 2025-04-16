import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
