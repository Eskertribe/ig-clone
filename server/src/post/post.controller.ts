import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Req,
  UseGuards,
  BadRequestException,
  Param,
  Patch,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';
import { UUID } from 'crypto';
// import { ApiResponse } from '../middleware/ApiResponse';

const allowedMimeTypes = ['image/png', 'image/jpeg', 'video/mp4']; // TODO: No hardcoded values

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('createPost')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueSuffix);
        },
      }),
    }),
  )
  @UseGuards(AuthGuard('jwt'))
  async createPost(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
    @Body() post: CreatePostDto,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    return this.postService.createPost({ file, post, user: req.user });
  }

  @Get('getPosts/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getPosts(@Param('userId') userId: UUID) {
    if (!userId) {
      throw new BadRequestException('Invalid request');
    }

    return this.postService.getPosts(userId);
  }

  @Patch('comment')
  @UseGuards(AuthGuard('jwt'))
  async addComment(@Body() body: { postId: UUID; comment: string }, @Req() req) {
    const { postId, comment } = body;

    if (!postId || !comment) {
      throw new BadRequestException('Invalid request');
    }

    return this.postService.addComment(postId, comment, req.user);
  }
}
