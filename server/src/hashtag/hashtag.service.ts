import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Hashtag } from './entity/hashtag.entity';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  async findHashtags(query: string): Promise<Hashtag[]> {
    return this.hashtagRepository.find({
      where: {
        name: ILike(`%${query}%`),
      },
    });
  }
}
