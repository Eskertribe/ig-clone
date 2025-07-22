import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Hashtag } from './entity/hashtag.entity';
import { HashtagService } from './hashtag.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/hashtags')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Get('/find/:query')
  @UseGuards(AuthGuard('jwt'))
  async findHashtags(@Param('query') query: string): Promise<Hashtag[]> {
    if (!query || query.length < 3) {
      return [];
    }

    return this.hashtagService.findHashtags(query);
  }
}
