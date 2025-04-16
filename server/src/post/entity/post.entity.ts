import { UUID } from 'crypto';
import { UserCommentDto } from 'src/user/dto/user.dto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from '../../comment/entity/comment.entity';
import { File } from '../../file/entity/file.entity';
import { Hashtag } from '../../hashtag/entity/hashtag.entity';
import { Like } from '../../like/entity/like.entity';
import { User } from '../../user/entity/user.entity';
import { PostDto } from '../dto/post.dto';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  description: string;

  @Column()
  disableComments: boolean;

  @Column()
  disableLikes: boolean;

  @OneToOne(() => File, (file) => file.post, {
    eager: true,
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  file: File;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user: User;

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.posts)
  @JoinTable()
  hashtags: Hashtag[];

  toDto(file: { id: UUID; image: string }, user: UserCommentDto): PostDto {
    return {
      id: this.id,
      description: this.description,
      disableComments: this.disableComments,
      disableLikes: this.disableLikes,
      file,
      user,
      comments: this.comments,
      createdAt: this.createdAt,
    };
  }
}
