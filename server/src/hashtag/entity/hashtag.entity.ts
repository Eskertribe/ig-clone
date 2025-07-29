import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Post } from '../../post/entity/post.entity';
import { PostToHashtag } from '../../post/entity/postToHashtag.entity';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => PostToHashtag, (postToHashtag) => postToHashtag.hashtag)
  postToHashtags: PostToHashtag[];
}
