import ITweetsRepository from '../ITweetsRepository';
import ITweetsDTO from '../../dtos/ITweetsDTO';
import Tweet from '../../infra/typeorm/entities/Tweet';

class FakeTweetRepository implements ITweetsRepository {
  private tweets: Tweet[] = [];

  public async findById(tweet_id: string): Promise<Tweet> {}

  public async create(content: ITweetsDTO): Promise<Tweet> {}

  public async save(tweet_id: string): Promise<Tweet> {}
}

export default FakeTweetRepository;
