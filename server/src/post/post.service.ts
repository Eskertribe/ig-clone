import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/post.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import multer from 'multer';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) { }

  async createPost(file: Express.Multer.File, postDto: CreatePostDto): Promise<void> {
    const { description, user, disableComments, disableLikes } = postDto;

    const res = await this.postRepository.save({
      description,
      user,
      disableComments,
      disableLikes,
      fileId: file.filename + "-" + uuidv4(),
    });
  }
}