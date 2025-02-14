import { User } from "src/user/entity/user.entity";

export class CreatePostDto {
  readonly description: string;
  readonly disableComments: boolean;
  readonly disableLikes: boolean;
  readonly user: User;
}

export class UpdatePostDto {
  readonly title?: string;
  readonly content?: string;
}