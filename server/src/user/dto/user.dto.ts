import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { File } from 'src/file/entity/file.entity';
import { PostDto } from 'src/post/dto/post.dto';

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
  @IsUUID()
  id: UUID;

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
  profilePicture: { id: UUID; image?: string };

  @Expose()
  posts: PostDto[];

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

export class UserCommentDto {
  id: UUID;
  username: string;
  profilePicture: {
    id: string;
    image: string;
  };
}
