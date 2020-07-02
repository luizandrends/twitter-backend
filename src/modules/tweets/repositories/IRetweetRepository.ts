import Retweet from '../infra/typeorm/entities/Retweet';

export default interface ILikesRepository {
  hasRetweet(tweet_id: string, user_id: string): Promise<Retweet | undefined>;
  findRetweet(retweet_id: string): Promise<Retweet | undefined>;
  create(tweet_id: string, user_id: string): Promise<Retweet>;
  save(retweet: Retweet): Promise<void>;
  countRetweets(tweet_id: string): Promise<number>;
  listUsers(tweet_id: string): Promise<Retweet[]>;
}
