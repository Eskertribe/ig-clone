import { UUID } from 'crypto';
import { User } from 'src/user/entity/user.entity';
import { Message } from './message.entity';

export class ConversationDto {
  id: UUID;
  participants: User[];
  messages: Message[];
}
