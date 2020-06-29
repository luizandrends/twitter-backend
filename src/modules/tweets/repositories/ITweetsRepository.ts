import ITweetsDTO from '../dtos/ITweetsDTO';
import Tweet from '../infra/typeorm/entities/Tweet';

export default interface ITweetsRepository {
  findById(tweet_id: string): Promise<Tweet>;
  create(content: ITweetsDTO): Promise<Tweet>;
  save(tweet_id: string): Promise<Tweet>;
}
