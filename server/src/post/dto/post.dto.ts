import { UUID } from 'crypto';
import { UserCommentDto } from '../../user/dto/user.dto';
import { User } from '../../user/entity/user.entity';
import { CommentDto } from '../../comment/dto/comment.dto';

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
  readonly disableComments?: boolean;
  readonly disableLikes?: boolean;
  readonly user?: UserCommentDto;
  readonly file: { id: UUID; image: string };
  readonly createdAt: Date;
  readonly comments: CommentDto[];
  readonly likes?: { userId: UUID }[];
  readonly seen: boolean;
}
