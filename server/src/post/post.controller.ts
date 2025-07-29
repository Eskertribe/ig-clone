import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { CreatePostDto } from './dto/post.dto';
import { PostService } from './post.service';

const allowedMimeTypes = ['image/png', 'image/jpeg', 'video/mp4'];

@Controller('v1/post')
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
  async createPost(@Req() req, @UploadedFile() file: Express.Multer.File, @Body() post: any) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    return this.postService.createPost({ file, post, user: req.user });
  }

  @Get('getPosts/:username')
  @UseGuards(AuthGuard('jwt'))
  async getPosts(@Param('username') username: UUID) {
    if (!username) {
      throw new BadRequestException('Invalid request');
    }

    return this.postService.getPosts(username);
  }

  @Get('getPost/:postId')
  @UseGuards(AuthGuard('jwt'))
  async getPost(@Param('postId') postId: UUID) {
    if (!postId) {
      throw new BadRequestException('Invalid request');
    }

    return this.postService.getPost(postId);
  }

  @Get('getLikes/:postId')
  @UseGuards(AuthGuard('jwt'))
  async getLikes(@Param('postId') postId: UUID) {
    if (!postId) {
      throw new BadRequestException('Invalid request');
    }

    return this.postService.getLikes(postId);
  }

  @Get('getPostsWithHashTag/:hashtag')
  @UseGuards(AuthGuard('jwt'))
  async getPostsWithHashTag(@Param('hashtag') hashtag: string) {
    if (!hashtag) {
      throw new BadRequestException('Invalid request');
    }

    return this.postService.getPostsWithHashTag(hashtag);
  }

  @Post('comment')
  @UseGuards(AuthGuard('jwt'))
  async addComment(@Body() body: { postId: UUID; comment: string; replytoId?: UUID }, @Req() req) {
    const { postId, comment, replytoId } = body;

    if (!postId || !comment) {
      throw new BadRequestException('Invalid request');
    }

    return this.postService.addComment(postId, comment, req.user, replytoId);
  }

  @Patch('edit/comment/:commentId')
  @UseGuards(AuthGuard('jwt'))
  async editComment(
    @Param('commentId') commentId: UUID,
    @Body() body: { postId: UUID; updatedComment: string },
    @Req() req,
  ) {
    const { postId, updatedComment } = body;

    if (!postId || !commentId || !updatedComment) {
      throw new BadRequestException('Invalid request');
    }

    return this.postService.editComment(postId, commentId, updatedComment, req.user.id);
  }

  @Post('like')
  @UseGuards(AuthGuard('jwt'))
  async addLike(@Body() body: { postId: UUID }, @Req() req) {
    const { postId } = body;

    if (!postId) {
      throw new BadRequestException('Invalid request');
    }

    return this.postService.addLike(postId, req.user);
  }

  @Post('likeComment')
  @UseGuards(AuthGuard('jwt'))
  async addLikeToComment(@Body() body: { postId: UUID; commentId: UUID }, @Req() req) {
    const { postId, commentId } = body;

    if (!postId || !commentId) {
      throw new BadRequestException('Invalid request');
    }

    return this.postService.addLikeToComment(postId, commentId, req.user);
  }

  @Post('userFeed')
  @UseGuards(AuthGuard('jwt'))
  async getUserFeed(@Body() { showSeen = false }: { showSeen: boolean }, @Req() req) {
    return this.postService.getUserFeed(req.user, showSeen);
  }

  @Post('markSeen')
  @UseGuards(AuthGuard('jwt'))
  async markPostSeen(@Body() { postId }: { postId: UUID }, @Req() req) {
    const userId = req.user.id;

    return this.postService.markPostSeen(userId, postId);
  }

  @Delete('like')
  @UseGuards(AuthGuard('jwt'))
  async removeLike(@Body() body: { postId: UUID }, @Req() req) {
    const { postId } = body;

    if (!postId) {
      throw new BadRequestException('Invalid request');
    }

    return this.postService.removeLike({ postId, user: req.user });
  }

  @Delete('/comment/remove/:commentId')
  @UseGuards(AuthGuard('jwt'))
  async removeComment(@Param('commentId') commentId: UUID, @Req() req) {
    return this.postService.removeComment(commentId, req.user.id);
  }
}
