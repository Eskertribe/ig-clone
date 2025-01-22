import { Hashtag } from 'src/hashtag/entity/hashtag.entity';
import { Post } from 'src/post/entity/post.entity';
import { User } from 'src/user/entity/user.entity';
import { Like } from 'src/like/entity/like.entity';
import { Comment } from 'src/comment/entity/comment.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'mydatabase',
  entities: [User, Post, Comment, Like, Hashtag],
  migrations: ['src/database/migrations/*-migration.ts'],
  synchronize: false,
});