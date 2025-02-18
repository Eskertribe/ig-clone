import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) { }

  async createPost(file: Express.Multer.File, postDto: CreatePostDto): Promise<void> {
    const { description, user, disableComments, disableLikes } = postDto;

    this.postRepository.save({
      description,
      user,
      disableComments,
      disableLikes,
      fileId: file.filename,
    });
  }
}