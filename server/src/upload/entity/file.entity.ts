import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { OneToOne, JoinColumn } from 'typeorm';
import { Post } from '../../post/entity/post.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Post)
  @JoinColumn()
  post: Post;

  @Column()
  sourceFileName: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}