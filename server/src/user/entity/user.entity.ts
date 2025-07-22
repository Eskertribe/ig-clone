import { UUID } from 'crypto';
import { Comment } from 'src/comment/entity/comment.entity';
import { File } from 'src/file/entity/file.entity';
import { UserFollower } from 'src/follow/entity/userfollower.entity';
import { Like } from 'src/like/entity/like.entity';
import { Post } from 'src/post/entity/post.entity';
import { UserSeenPost } from 'src/post/entity/userSeenPost.entity';
import { imageToStringBuffer } from 'src/utils/imageToBuffer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserCommentDto, UserDto, UserFollowerDto, UserProfileDataDto } from '../dto/user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

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

  @OneToMany(() => UserFollower, (follower) => follower.user)
  followers: UserFollower[];

  @OneToMany(() => UserFollower, (follower) => follower.follower)
  following: UserFollower[];

  @OneToMany(() => UserSeenPost, (seen) => seen.user)
  seenPosts: UserSeenPost[];

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

  async toUserProfileDataDto(isFollowed?: boolean): Promise<UserProfileDataDto> {
    return {
      id: this.id,
      username: this.username,
      name: this.name,
      bio: this.bio,
      email: this.email,
      profilePicture: {
        id: this.profilePicture.id,
        image: await imageToStringBuffer(this.profilePicture.name, this.profilePicture.mimeType),
      },
      following: this.following?.length ?? 0,
      followers: this.followers?.length ?? 0,
      isFollowed: isFollowed ?? false,
    };
  }

  async toCommentDto(): Promise<UserCommentDto> {
    return {
      id: this.id,
      username: this.username,
      profilePicture: {
        id: this.profilePicture.id,
        image: await imageToStringBuffer(this.profilePicture.name, this.profilePicture.mimeType),
      },
    };
  }

  async toFollowerDto(): Promise<UserFollowerDto> {
    return {
      id: this.id,
      name: this.name,
      username: this.username,
      profilePicture: {
        id: this.profilePicture.id,
        image: await imageToStringBuffer(this.profilePicture.name, this.profilePicture.mimeType),
      },
    };
  }
}
