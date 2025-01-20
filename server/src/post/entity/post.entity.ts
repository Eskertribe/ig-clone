import { Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, OneToOne, JoinColumn, Column } from 'typeorm';
import { User } from '../../user/entity/user.entity'
import { File } from '../../upload/entity/file.entity';
import { Like } from '../../like/entity/like.entity';
import { Comment } from '../../comment/entity/comment.entity';

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

  @OneToOne(() => File)
  @JoinColumn()
  file: File;

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
}