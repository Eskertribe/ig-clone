import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Post } from '../../post/entity/post.entity';
import { CommentDto } from '../dto/comment.dto';
import { UUID } from 'crypto';
import { UserCommentDto } from 'src/user/dto/user.dto';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: UUID;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Column('text')
  text: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  toDto(user: UserCommentDto): CommentDto {
    return {
      id: this.id,
      text: this.text,
      user,
      createdAt: this.createdAt,
    };
  }
}
