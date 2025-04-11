import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from 'src/comment/entity/comment.entity';
import { Like } from 'src/like/entity/like.entity';
import { Post } from 'src/post/entity/post.entity';
import { UserDto, UserProfileDataDto } from '../dto/user.dto';
import { File } from 'src/file/entity/file.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  password?: string; // TODO: Hash the password before saving it

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];

  @OneToOne(() => File, (file) => file.user, {
    eager: true,
    cascade: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profilePicture: File;

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable({
    name: 'user_followers',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'followerId', referencedColumnName: 'id' },
  })
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  toUserDto(): UserDto {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
    };
  }

  toUserProfileDataDto(): UserProfileDataDto {
    return {
      username: this.username,
      name: this.name,
      bio: this.bio,
      email: this.email,
      profilePicture: this.profilePicture,
      posts: this.posts,
      following: this.following,
      followers: this.followers,
    };
  }
}
