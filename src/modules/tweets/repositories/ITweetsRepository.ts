import ITweetsDTO from '../dtos/ITweetsDTO';
import Tweet from '../infra/typeorm/entities/Tweet';

export default interface ITweetsRepository {
  findByContent(tweet_id: string): Promise<Tweet | undefined>;
  create({ content }: ITweetsDTO): Promise<Tweet>;
  save(tweet: Tweet): Promise<Tweet>;
}
