import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Post } from '../../post/entity/post.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @OneToOne(() => Post, (post) => post.file)
  post: Post;
}
