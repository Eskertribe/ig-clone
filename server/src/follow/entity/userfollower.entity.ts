import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity('user_followers')
export class UserFollower {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  followerId: string;

  @ManyToOne(() => User, (user) => user.following)
  user: User;

  @ManyToOne(() => User, (user) => user.followers)
  follower: User;
}
