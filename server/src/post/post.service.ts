import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { CommentDto } from '../comment/dto/comment.dto';
import { Comment } from '../comment/entity/comment.entity';
import { UserFollower } from '../follow/entity/userfollower.entity';
import { Hashtag } from '../hashtag/entity/hashtag.entity';
import { Like } from '../like/entity/like.entity';
import { LikeDto } from '../like/like.dto';
import { UserAuthDTO } from '../user/dto/user.dto';
import { In, IsNull, Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';
import { Post } from './entity/post.entity';
import { PostToHashtag } from './entity/postToHashtag.entity';
import { UserSeenPost } from './entity/userSeenPost.entity';
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
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
    @InjectRepository(PostToHashtag)
    private readonly postToHashTagRepository: Repository<PostToHashtag>,
    @InjectRepository(UserSeenPost)
    private readonly userSeenPostRepository: Repository<UserSeenPost>,
    @InjectRepository(UserFollower)
    private readonly userFollowerRepository: Repository<UserFollower>,
  ) {}

  async createPost({ file, post, user }: CreatePostRequest): Promise<Post> {
    const { description, disableComments, disableLikes } = post;

    const newPost = await this.postRepository.save({
      description,
      user,
      disableComments,
      disableLikes,
      file: { name: file.filename, mimeType: file.mimetype },
    });

    this.handleHashTags(description, newPost, user);

    return newPost;
  }

  async addComment(
    postId: UUID,
    text: string,
    user: UserAuthDTO,
    replytoId?: UUID,
  ): Promise<CommentDto> {
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: { user: true },
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    if (post.disableComments) {
      throw new BadRequestException('Comments are disabled for this post');
    }

    this.handleHashTags(text, post, user);

    if (replytoId) {
      const comment = await this.commentRepository.findOne({
        where: { id: replytoId, post: { id: postId }, deletedAt: IsNull() },
        relations: { parentComment: true },
      });

      if (!comment) {
        throw new BadRequestException('Comment not found');
      }

      const replyTo = !comment.isParent ? comment.parentComment.id : comment.id;
      const saved = await this.commentRepository.save({
        text,
        user: { id: user.id },
        post: { id: post.id },
        parentComment: replyTo ? { id: replyTo } : undefined,
      });

      const newComment = await this.commentRepository.findOne({
        where: { id: saved.id as UUID },
        relations: { user: true, parentComment: true },
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
      text: text,
      user: { id: user.id },
      post: { id: post.id },
      isParent: true,
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

  async editComment(postId: UUID, commentId: UUID, updatedComment: string, userId: UUID) {
    const existingComment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: { post: true, user: true },
    });

    if (!existingComment) {
      throw new BadRequestException('Comment not found');
    }

    if (existingComment.post.id !== postId) {
      throw new BadRequestException('Comment not found');
    }

    if (existingComment.user.id !== userId) {
      throw new BadRequestException('Can only edit own comments');
    }

    await this.commentRepository.update({ id: existingComment.id }, { text: updatedComment });

    const fromDb = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: { post: true, user: true },
    });

    return fromDb!.toDto();
  }

  async removeComment(commentId: UUID, userId: UUID) {
    const existing = await this.commentRepository.findOne({
      where: { id: commentId, user: { id: userId } },
    });

    if (!existing) {
      throw new BadRequestException('Could not find comment');
    }

    this.commentRepository.softDelete(commentId);
  }

  async getPost(postId: UUID): Promise<PostDto> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .select([
        'post',
        'user.id',
        'user.username',
        'userProfilePicture',
        'file',
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
      ])
      .leftJoin('post.user', 'user')
      .leftJoin('user.profilePicture', 'userProfilePicture')
      .leftJoin('post.file', 'file')
      .leftJoinAndSelect(
        'post.comments',
        'comment',
        'comment.deletedAt IS NULL AND comment.isParent = true',
      )
      .leftJoin('comment.user', 'commentUser')
      .leftJoin('commentUser.profilePicture', 'commentUserProfilePicture')
      .leftJoin('comment.likes', 'commentLikes')
      .leftJoin('commentLikes.user', 'commentLikesUser')
      .leftJoinAndSelect('comment.replies', 'reply', 'reply.deletedAt IS NULL')
      .leftJoin('reply.user', 'replyUser')
      .leftJoin('replyUser.profilePicture', 'replyUserProfilePicture')
      .leftJoin('reply.likes', 'replyLikes')
      .leftJoin('replyLikes.user', 'replyLikesUser')
      .where('post.id = :postId', { postId })
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

  async getPosts(username: string): Promise<PostDto[]> {
    const posts = await this.postRepository.find({
      where: { user: { username } },
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

  async removeLike({
    postId,
    commentId,
    user,
  }: {
    postId: UUID;
    commentId?: UUID;
    user: UserAuthDTO;
  }): Promise<void> {
    const like = await this.likeRepository.findOne({
      where: { post: { id: postId }, comment: { id: commentId }, user: { id: user.id } },
    });

    if (!like) {
      throw new BadRequestException('Like not found');
    }

    this.likeRepository.delete({ id: like.id });
  }

  async getPostsWithHashTag(tagName: string) {
    const hashtag = await this.hashtagRepository.findOne({
      where: { name: tagName },
      relations: ['postToHashtags', 'postToHashtags.post'],
    });

    if (!hashtag) {
      throw new BadRequestException('Invalid request');
    }

    const posts = hashtag.postToHashtags.map((postToHashtag) => postToHashtag.post);

    if (!posts.length) {
      return [];
    }

    return Promise.all(posts.map((post) => post.toDto()));
  }

  async getUserFeed(user: UserAuthDTO, showSeen: boolean): Promise<PostDto[]> {
    const followedUsers = await this.userFollowerRepository.find({
      where: { followerId: user.id },
      relations: { user: true },
    });

    const followedUserIds = followedUsers.map((u) => u.userId);

    if (!followedUserIds.length) {
      return [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //@ts-ignore
    let where: any = {
      user: {
        id: In(followedUserIds),
      },
    };

    const seenPosts = await this.userSeenPostRepository
      .createQueryBuilder('userSeenPost')
      .where('userSeenPost.userId = :userId', { userId: user.id })
      .leftJoinAndSelect('userSeenPost.post', 'post')
      .select(['userSeenPost.id', 'post.id'])
      .getMany();
    const seenPostIds = seenPosts.map((usp) => usp.post.id);

    if (!showSeen && seenPostIds.length > 0) {
      const unseenPostIds = await this.postRepository
        .createQueryBuilder('post')
        .select('post.id')
        .where('post.userId IN (:...followedUserIds)', { followedUserIds })
        .andWhere('post.id NOT IN (:...seenPostIds)', { seenPostIds })
        .getRawMany()
        .then((rows) => rows.map((row) => row.post_id as string));

      where.id = In(unseenPostIds);
    }

    const posts = await this.postRepository.find({
      where,
      relations: { file: true, user: { profilePicture: true }, likes: { user: true } },
      order: {
        createdAt: 'DESC',
      },
    });

    return Promise.all(posts.map((post) => post.toDto(seenPostIds.includes(post.id))));
  }

  async markPostSeen(userId: UUID, postId: UUID) {
    const existing = await this.userSeenPostRepository.findOne({
      where: { user: { id: userId }, post: { id: postId } },
    });

    if (!existing) {
      await this.userSeenPostRepository.save({ user: { id: userId }, post: { id: postId } });
    }
  }

  private async handleHashTags(text: string, post: Post, user: UserAuthDTO) {
    if (user.id === post?.user.id) {
      const hashTags = Array.from(text.matchAll(/#([a-zA-Z]+)/g)).map((match) => match[1]);

      hashTags.map(async (hashTag) => {
        const existing = await this.hashtagRepository.findOne({ where: { name: hashTag } });
        const fromDb = existing
          ? existing
          : await this.hashtagRepository.save({
              name: hashTag,
            });

        return this.postToHashTagRepository.save({
          post: { id: post.id },
          hashtag: { id: fromDb.id },
        });
      });
    }
  }
}
