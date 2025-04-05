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
