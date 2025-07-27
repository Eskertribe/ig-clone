import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entity/message.entity';
import { Conversation } from './entity/conversation.entity';
import { UUID } from 'crypto';
import { ConversationDto } from './entity/conversation.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
  ) {}

  async getConversations(userId: UUID): Promise<ConversationDto[]> {
    const conversations = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.participants', 'participant')
      .leftJoinAndSelect('conversation.messages', 'message')
      .leftJoinAndSelect('conversation.participants', 'allParticipants')
      .leftJoinAndSelect('conversation.createdBy', 'createdBy')
      .leftJoinAndSelect('message.sender', 'messageSender')
      .where('participant.id = :userId', { userId })
      .orderBy('message.createdAt', 'ASC')
      .getMany();

    if (!conversations) {
      return [];
    }

    return Promise.all(conversations.map((conversation) => conversation.toDto()));
  }

  async getConversation(userId: UUID, conversationId: UUID): Promise<ConversationDto | null> {
    const conversation = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.participants', 'participant')
      .leftJoinAndSelect('conversation.messages', 'message')
      .leftJoinAndSelect('message.sender', 'messageSender')
      .leftJoinAndSelect('conversation.participants', 'allParticipants')
      .leftJoinAndSelect('conversation.createdBy', 'createdBy')
      .where('conversation.id = :conversationId', { conversationId })
      .andWhere('participant.id = :userId', { userId })
      .getOne();

    if (!conversation) {
      return null;
    }

    return conversation.toDto();
  }

  async createConversation(senderId: UUID, recipientIds: UUID[]): Promise<Conversation> {
    return this.conversationRepository.save({
      participants: [{ id: senderId }, ...recipientIds.map((id) => ({ id }))],
      createdBy: { id: senderId },
    });
  }

  async sendToConversation(conversationId: UUID, message: string, sender: UUID) {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: { participants: true },
    });

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    if (!conversation.participants.some((participant) => participant.id === sender)) {
      throw new Error('Sender is not a participant in the conversation');
    }

    return this.messageRepository.save({ content: message, conversation, sender: { id: sender } });
  }

  async deleteMessage(userId: UUID, messageId: UUID): Promise<void> {
    const message = await this.messageRepository.findOne({
      where: { id: messageId },
      relations: { sender: true },
    });

    if (!message || message.sender.id !== userId) {
      throw new Error('Message not found or user is not the sender');
    }

    await this.messageRepository.softDelete(messageId);
  }

  async deleteConversation(userId: UUID, conversationId: UUID): Promise<void> {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
      relations: { createdBy: true, messages: true },
    });

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    if (conversation.createdBy.id !== userId) {
      throw new Error('Conversation not created by user');
    }

    const messageIds = conversation.messages.map(({ id }) => id);

    await this.messageRepository.softDelete(messageIds);
    await this.conversationRepository.softDelete(conversationId);
  }
}
