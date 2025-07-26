import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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

  @Post('/createConversation')
  @UseGuards(AuthGuard('jwt'))
  async createConversation(@Body() body: { participants: UUID[] }, @Req() req) {
    const sender = req.user.id;

    const { id } = await this.messageService.createConversation(sender, body.participants);

    return { id };
  }

  @Post('/sendToConversation')
  @UseGuards(AuthGuard('jwt'))
  async sendToConversation(
    @Body() { conversationId, message }: { conversationId: UUID; message: string },
    @Req() req,
  ) {
    const sender = req.user.id;

    return this.messageService.sendToConversation(conversationId, message, sender);
  }
}
