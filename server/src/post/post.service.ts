import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { CreatePostRequest } from './post.types';
import { UUID } from 'crypto';
import { UserAuthDTO } from 'src/user/dto/user.dto';
import { Comment } from 'src/comment/entity/comment.entity';
import { CommentDto } from 'src/comment/dto/comment.dto';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
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

  async addComment(postId: UUID, comment: string, user: UserAuthDTO): Promise<CommentDto> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    if (post.disableComments) {
      throw new BadRequestException('Comments are disabled for this post');
    }

    const { identifiers } = await this.commentRepository.insert({
      text: comment,
      user: { id: user.id },
      post: { id: post.id },
    });

    const newComment = await this.commentRepository.findOne({
      where: { id: identifiers[0].id as UUID },
      relations: ['user', 'user.profilePicture'],
    });

    if (!newComment) {
      throw new InternalServerErrorException();
    }

    return newComment.toDto();
  }

  async getPosts(userId: UUID): Promise<PostDto[]> {
    const posts = await this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'user.profilePicture'],
    });

    if (!posts) {
      throw new BadRequestException('No posts found');
    }

    const postDtos = await Promise.all(posts.map((post) => post.toDto()));

    return postDtos;
  }
}
