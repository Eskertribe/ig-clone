import { UUID } from 'crypto';
import { Hashtag } from 'src/hashtag/entity/hashtag.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class PostToHashtag {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => Post, (post) => post.postToHashtags)
  post: Post;

  @ManyToOne(() => Hashtag, (hashtag) => hashtag.postToHashtags)
  hashtag: Hashtag;
}
