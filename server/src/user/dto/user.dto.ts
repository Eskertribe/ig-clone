import { UUID } from 'crypto';
import { Post } from 'src/post/entity/post.entity';
import { File } from 'src/file/entity/file.entity';

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserProfileDataDto {
  id: string;
  username: string;
  email: string;
  profilePicture: File;
  posts: Post[];
}
