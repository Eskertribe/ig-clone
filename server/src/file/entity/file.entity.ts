import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';
import { UUID } from 'crypto';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  mimeType: string;

  @OneToOne(() => Post, (post) => post.file, { nullable: true })
  post?: Post;

  @OneToOne(() => User, (user) => user.profilePicture)
  user: User;

  toDto() {
    return {
      id: this.id,
      name: this.name,
      mimeType: this.mimeType,
    };
  }
}
