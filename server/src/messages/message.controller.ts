import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
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
    return this.messageService.getConversations(userId);
  }

  @Get('/getConversation/:conversationId')
  @UseGuards(AuthGuard('jwt'))
  async getConversation(@Req() req, @Param('conversationId') conversationId: UUID) {
    const userId = req.user.id;
    return this.messageService.getConversation(userId, conversationId);
  }

  @Post('/createConversation')
  @UseGuards(AuthGuard('jwt'))
  async createConversation(@Body() body: { participants: UUID[] }, @Req() req) {
    const sender = req.user.id;

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

    return this.messageService.sendToConversation(conversationId, message, sender);
  }
}
