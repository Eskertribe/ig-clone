import { Post } from 'src/post/entity/post.entity';
import { File } from 'src/file/entity/file.entity';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  token: string;
}

export class LoginUserDto {
  username: string;
  email: string;
  password: string;
}

export class UserDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  username: string;

  @Expose()
  @IsString()
  email: string;
}

export class UserProfileDataDto {
  @Expose()
  username: string;

  @Expose()
  name: string;

  @Expose()
  bio?: string;

  @Expose()
  email: string;

  @Expose()
  profilePicture: File;

  @Expose()
  posts: Post[];

  @Expose()
  followers: UserFollowerDto[];

  @Expose()
  following: UserFollowerDto[];
}

export class UserFollowerDto {
  username: string;
  name: string;
  profilePicture: File;
}
