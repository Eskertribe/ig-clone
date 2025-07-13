import { UUID } from 'crypto';
import { UserCommentDto } from 'src/user/dto/user.dto';

export class CommentDto {
  id: UUID;
  text: string;
  user: UserCommentDto;
  createdAt: Date;
  replies?: CommentDto[];
  likes: { userId: UUID }[];
  parentId?: UUID;
}
