import Like from '../infra/typeorm/entities/Like';

export default interface ILikesRepository {
  create(tweet_id: string, user_id: string): Promise<Like>;
  delete(tweet_id: string): Promise<void>;
}
