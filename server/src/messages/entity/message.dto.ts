import { UUID } from 'crypto';
import { UserDto } from '../../user/dto/user.dto';

export class MessageDto {
  id: UUID;
  content: string;
  createdAt: Date;
  sender: UserDto;
}
