import { UUID } from 'crypto';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Post } from './post.entity';

@Entity()
export class UserSeenPost {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => User, (user) => user.seenPosts, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Post, { onDelete: 'CASCADE' })
  post: Post;

  @CreateDateColumn()
  seenAt: Date;
}
