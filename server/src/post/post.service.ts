import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { CommentDto } from 'src/comment/dto/comment.dto';
import { Comment } from 'src/comment/entity/comment.entity';
import { Like } from 'src/like/entity/like.entity';
import { LikeDto } from 'src/like/like.dto';
import { UserAuthDTO } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';
import { Post } from './entity/post.entity';
import { CreatePostRequest } from './post.types';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
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

  async addComment(
    postId: UUID,
    comment: string,
    user: UserAuthDTO,
    replytoId?: UUID,
  ): Promise<CommentDto> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    if (post.disableComments) {
      throw new BadRequestException('Comments are disabled for this post');
    }

    if (replytoId) {
      const parentComment = await this.commentRepository.findOne({
        where: { id: replytoId },
        relations: ['post', 'replies'],
      });

      if (!parentComment || parentComment.parentComment) {
        throw new BadRequestException('Cannot reply to this comment');
      }

      if (parentComment.post.id !== postId) {
        throw new BadRequestException('Invalid post');
      }

      const saved = await this.commentRepository.save({
        ...parentComment,
        replies: [
          ...parentComment.replies,
          { text: comment, user: { id: user.id }, post: { id: parentComment.post.id } },
        ],
      });

      const newComment = await this.commentRepository.findOne({
        where: { id: saved.id as UUID },
        relations: ['user'],
        select: {
          user: {
            id: true,
            username: true,
            profilePicture: true,
          },
        },
      });

      if (!newComment) {
        throw new InternalServerErrorException();
      }

      return newComment.toDto();
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

  async getPost(postId: UUID): Promise<PostDto> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .select([
        'post',
        'comment',
        'commentUser.id',
        'commentUser.username',
        'commentUserProfilePicture',
        'commentLikes',
        'commentLikesUser',
        'reply',
        'replyUser.id',
        'replyUser.username',
        'replyUserProfilePicture',
        'replyLikes',
        'replyLikesUser',
        'user.id',
        'user.username',
        'userProfilePicture',
        'file',
      ])
      .leftJoin('post.comments', 'comment')
      .leftJoin('post.user', 'user')
      .leftJoin('user.profilePicture', 'userProfilePicture')
      .leftJoin('comment.user', 'commentUser')
      .leftJoin('commentUser.profilePicture', 'commentUserProfilePicture')
      .leftJoin('comment.replies', 'reply')
      .leftJoin('comment.likes', 'commentLikes')
      .leftJoin('commentLikes.user', 'commentLikesUser')
      .leftJoin('reply.user', 'replyUser')
      .leftJoin('replyUser.profilePicture', 'replyUserProfilePicture')
      .leftJoin('reply.likes', 'replyLikes')
      .leftJoin('replyLikes.user', 'replyLikesUser')
      .leftJoin('post.file', 'file')
      .where('post.id = :postId', { postId })
      .andWhere('comment.deletedAt IS NULL')
      .andWhere('comment.isParent = true')
      .andWhere('reply.deletedAt IS NULL')
      .andWhere('post.deletedAt IS NULL')
      .orderBy('post.createdAt', 'DESC')
      .addOrderBy('comment.createdAt', 'ASC')
      .addOrderBy('reply.createdAt', 'ASC')
      .getOne();

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    return post.toDto();
  }

  async getPosts(userId: UUID): Promise<PostDto[]> {
    const posts = await this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['file'],
    });

    if (!posts) {
      throw new BadRequestException('No posts found');
    }

    const postDtos = await Promise.all(posts.map((post) => post.toDto()));

    return postDtos;
  }

  async getLikes(postId: UUID): Promise<LikeDto[]> {
    const likes = await this.likeRepository.find({
      where: { post: { id: postId } },
      relations: ['user'],
      select: {
        user: {
          id: true,
        },
      },
    });

    if (!likes) {
      throw new BadRequestException('Post not found');
    }

    return likes.map((like) => like.toDto());
  }

  async addLike(postId: UUID, user: UserAuthDTO): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    if (post.disableLikes) {
      throw new BadRequestException('Likes are disabled for this post');
    }

    await this.likeRepository.insert({
      post: { id: post.id },
      user: { id: user.id },
    });
  }

  async addLikeToComment(postId: UUID, commentId: UUID, user: UserAuthDTO) {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['comments'],
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    if (post.disableLikes) {
      throw new BadRequestException('Likes are disabled for this post');
    }

    const comment = post.comments.find((c) => c.id === commentId);

    if (!comment) {
      throw new BadRequestException('Comment not found');
    }

    const existingLike = await this.likeRepository.findOne({
      where: { comment: { id: comment.id }, user: { id: user.id } },
    });

    if (existingLike) {
      throw new BadRequestException('Cannot like the same comment multiple times');
    }

    await this.likeRepository.insert({
      comment: { id: comment.id },
      user: { id: user.id },
    });
  }

  async removeLike(postId: UUID, user: UserAuthDTO): Promise<void> {
    const like = await this.likeRepository.findOne({
      where: { post: { id: postId }, user: { id: user.id } },
    });

    if (!like) {
      throw new BadRequestException('Like not found');
    }

    this.likeRepository.delete({ id: like.id });
  }
}
