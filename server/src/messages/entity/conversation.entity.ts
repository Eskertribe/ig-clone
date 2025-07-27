import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Message } from './message.entity';
import { UUID } from 'crypto';
import { CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { ConversationDto } from './conversation.dto';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];

  @ManyToOne(() => User)
  @JoinTable()
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  toDto(): ConversationDto {
    return {
      id: this.id,
      participants: this.participants.map((user) => user.toUserDto()),
      messages: this.messages.map((message) => message.toDto()),
      createdAt: this.createdAt,
      createdBy: this.createdBy.id,
    };
  }
}
