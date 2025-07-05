import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Post } from 'src/post/entity/post.entity';
import { Comment } from 'src/comment/entity/comment.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  post?: Post;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  comment?: Comment;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  toDto(commentId?: string) {
    return {
      userId: this.user.id,
      commentId: commentId,
    };
  }
}
