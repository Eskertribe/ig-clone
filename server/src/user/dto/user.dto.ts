import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

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
  id: UUID;

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
  followers: number;

  @Expose()
  following: number;

  @Expose()
  isFollowed: boolean;
}

export class UserFollowerDto {
  id: string;
  username: string;
  name: string;
  profilePicture: { id: UUID; image?: string };
}

export class UserCommentDto {
  id: UUID;
  username: string;
  profilePicture: {
    id: string;
    image: string;
  };
}

export class UserAuthDTO {
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
