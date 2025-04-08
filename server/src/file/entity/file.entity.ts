import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';

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

  @OneToOne(() => User, (user) => user.profilePicture)
  user: User;
}
