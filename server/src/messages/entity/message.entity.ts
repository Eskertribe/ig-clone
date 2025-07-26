import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Conversation } from './conversation.entity';
import { UUID } from 'crypto';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @ManyToOne(() => User)
  sender: User;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  toDto() {
    return {
      id: this.id,
      content: this.content,
      createdAt: this.createdAt,
      sender: this.sender.toUserDto(),
    };
  }
}
