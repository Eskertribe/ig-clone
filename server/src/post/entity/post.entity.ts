import { UUID } from 'crypto';
import { imageToStringBuffer } from 'src/utils/imageToBuffer';
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
import { Comment } from 'src/comment/entity/comment.entity';
import { File } from 'src/file/entity/file.entity';
import { Hashtag } from 'src/hashtag/entity/hashtag.entity';
import { Like } from 'src/like/entity/like.entity';
import { User } from 'src/user/entity/user.entity';
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

  @OneToMany(() => Like, (like) => like.post, { cascade: true })
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comments: Comment[];

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.posts)
  @JoinTable()
  hashtags: Hashtag[];

  async toDto(): Promise<PostDto> {
    return {
      id: this.id,
      description: this.description,
      disableComments: this.disableComments,
      disableLikes: this.disableLikes,
      file: {
        id: this.file.id,
        image: await imageToStringBuffer(this.file.name, this.file.mimeType),
      },
      user: this.user ? await this.user?.toCommentDto() : undefined,
      comments: this.comments
        ? await Promise.all(this.comments.map((comment) => comment.toDto()))
        : [],
      createdAt: this.createdAt,
      likes: this.likes ? this.likes.map((like) => ({ userId: like.user.id })) : [],
    };
  }
}
