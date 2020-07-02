import User from '@modules/users/infra/typeorm/entities/User';
import Like from '../infra/typeorm/entities/Like';

export default interface ILikesRepository {
  create(tweet_id: string, user_id: string): Promise<Like>;
  delete(tweet_id: string): Promise<void>;
  countLikes(tweet_id: string): Promise<number>;
  listUsers(tweet_id: string): Promise<Like[]>;
}
