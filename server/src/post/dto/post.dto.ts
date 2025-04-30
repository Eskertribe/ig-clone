import { UUID } from 'crypto';
import { UserCommentDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';
import { CommentDto } from 'src/comment/dto/comment.dto';

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

export class PostDto {
  readonly id: string;
  readonly description: string;
  readonly disableComments: boolean;
  readonly disableLikes: boolean;
  readonly user: UserCommentDto;
  readonly file: { id: UUID; image: string };
  readonly createdAt: Date;
  readonly comments: CommentDto[];
  readonly likes: { userId: UUID }[];
}
