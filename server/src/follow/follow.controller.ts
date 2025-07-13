import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UUID } from 'crypto';
import { Returns } from '../middleware/ApiResponse';
import { FollowService } from './follow.service';

@Controller('followers')
export class FollowController {
  constructor(private readonly followservice: FollowService) {}
}
