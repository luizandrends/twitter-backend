import ITweetsDTO from '../dtos/ITweetsDTO';
import Tweet from '../infra/typeorm/entities/Tweet';

export default interface ITweetsRepository {
  create(content: ITweetsDTO): Promise<Tweet>;
  save(tweet_id: string): Promise<Tweet>;
}
