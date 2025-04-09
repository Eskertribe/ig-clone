import { Post } from 'src/post/entity/post.entity';
import { File } from 'src/file/entity/file.entity';

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
  id: string;
  username: string;
  email: string;
}

export class UserProfileDataDto {
  id: string;
  username: string;
  name: string;
  bio?: string;
  email: string;
  profilePicture: File;
  posts: Post[];
  followers: UserFollowerDto[];
  following: UserFollowerDto[];
}

export class UserFollowerDto {
  username: string;
  name: string;
  profilePicture: File;
}
