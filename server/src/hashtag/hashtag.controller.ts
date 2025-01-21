import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hashtag } from './entity/hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) { }

  async createHashtag(name: string): Promise<Hashtag> {
    const hashtag = this.hashtagRepository.create({ name });
    return this.hashtagRepository.save(hashtag);
  }
}