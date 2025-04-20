import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';
import { CommentDto } from '../dto/comment.dto';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => User, (user) => user.comments, { eager: true })
  user: User;

  @Column('text')
  text: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

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
    };
  }
}
