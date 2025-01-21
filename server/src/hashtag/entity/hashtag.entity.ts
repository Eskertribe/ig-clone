import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../../post/entity/post.entity";
import { ManyToMany, JoinTable } from "typeorm";

export class Hashtag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Post, post => post.hashtags)
  @JoinTable()
  posts: Post[];
}