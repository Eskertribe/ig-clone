import { UUID } from 'crypto';
import { Like } from 'src/like/entity/like.entity';
import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommentDto } from '../dto/comment.dto';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column('text')
  text: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Column({ default: false })
  isParent: boolean;

  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true, onDelete: 'CASCADE' })
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment, { cascade: true })
  replies: Comment[];

  @OneToMany(() => Like, (like) => like.comment, { cascade: true })
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  async toDto(): Promise<CommentDto> {
    return {
      id: this.id,
      text: this.text,
      user: await this.user.toCommentDto(),
      createdAt: this.createdAt,
      replies:
        this.replies && this.isParent
          ? await Promise.all(this.replies.map((reply) => reply.toDto()))
          : [],
      likes: this.likes ? await Promise.all(this.likes.map((like) => like.toDto(this.id))) : [],
    };
  }
}
