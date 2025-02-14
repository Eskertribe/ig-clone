import { Controller, Post, Body, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

const allowedMimeTypes = ['image/png', 'image/jpeg', 'video/mp4'];

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('createPost')
  @UseInterceptors(FileInterceptor("file"))
  async createPost(@UploadedFile() file, @Body() post: CreatePostDto, @Res() res: Response) {
    if (!file) {
      return res.status(400).json({ message: 'File is required' });
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type' });
    }
    // TODO: Implement
    const result = await this.postService.createPost(file, post);

    return res.json({ message: 'Post created successfully' });
  }
}