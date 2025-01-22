import { Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, Column, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Like } from '../../like/entity/like.entity';
import { Comment } from '../../comment/entity/comment.entity';
import { Hashtag } from '../../hashtag/entity/hashtag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  disableComments: boolean;

  @Column()
  disableLikes: boolean;

  @Column()
  fileId: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToMany(() => Like, like => like.post)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.post)
  comments: Comment[];

  @ManyToMany(() => Hashtag, hashtag => hashtag.posts)
  @JoinTable()
  hashtags: Hashtag[];
}