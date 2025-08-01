import { UUID } from 'crypto';
import { UserDto } from '../../user/dto/user.dto';
import { MessageDto } from './message.dto';

export class ConversationDto {
  id: UUID;
  participants: UserDto[];
  messages: MessageDto[];
  createdAt: Date;
  createdBy: UUID;
}
