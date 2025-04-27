import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';
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

  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  parentComment: Comment;

  @OneToMany(() => Comment, (comment) => comment.parentComment, { cascade: true })
  replies: Comment[];

  @Column({ default: 0 })
  repliesCount: number;

  @Column({ default: 0 })
  likesCount: number;

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
      replies: this.replies ? await Promise.all(this.replies.map((reply) => reply.toDto())) : [],
    };
  }
}
