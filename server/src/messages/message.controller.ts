import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { MessageService } from './message.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('/getConversations')
  @UseGuards(AuthGuard('jwt'))
  async getConversations(@Req() req) {
    const userId = req.user.id;

    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    return this.messageService.getConversations(userId);
  }

  @Get('/getConversation/:conversationId')
  @UseGuards(AuthGuard('jwt'))
  async getConversation(@Req() req, @Param('conversationId') conversationId: UUID) {
    const userId = req.user.id;

    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    if (!conversationId) {
      throw new BadRequestException('Conversation ID is required');
    }

    return this.messageService.getConversation(userId, conversationId);
  }

  @Post('/createConversation')
  @UseGuards(AuthGuard('jwt'))
  async createConversation(@Body() body: { participants: UUID[] }, @Req() req) {
    const sender = req.user.id;

    if (!sender) {
      throw new BadRequestException('User ID is required');
    }

    if (!body.participants || !Array.isArray(body.participants) || body.participants.length === 0) {
      throw new BadRequestException('Participants array is required');
    }

    const { id } = await this.messageService.createConversation(sender, body.participants);

    return { id };
  }

  @Post('/sendToConversation/:conversationId')
  @UseGuards(AuthGuard('jwt'))
  async sendToConversation(
    @Param('conversationId') conversationId: UUID,
    @Body() { message }: { message: string },
    @Req() req,
  ) {
    const sender = req.user.id;

    if (!sender) {
      throw new BadRequestException('User ID is required');
    }

    if (!conversationId) {
      throw new BadRequestException('Conversation ID is required');
    }

    if (!message) {
      throw new BadRequestException('Message content is required');
    }

    return this.messageService.sendToConversation(conversationId, message, sender);
  }

  @Delete('/deleteMessage/:messageId')
  @UseGuards(AuthGuard('jwt'))
  async deleteMessage(@Param('messageId') messageId: UUID, @Req() req) {
    const userId = req.user.id;

    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    if (!messageId) {
      throw new BadRequestException('Message ID is required');
    }

    return this.messageService.deleteMessage(userId, messageId);
  }

  @Delete('/deleteConversation/:conversationId')
  @UseGuards(AuthGuard('jwt'))
  async deleteConversation(@Param('conversationId') conversationId: UUID, @Req() req) {
    const userId = req.user.id;

    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    if (!conversationId) {
      throw new BadRequestException('Conversation ID is required');
    }

    return this.messageService.deleteConversation(userId, conversationId);
  }
}
