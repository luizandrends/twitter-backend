import ITweetsRepository from '@modules/tweets/repositories/ITweetsRepository';
import ITweetsDTO from '@modules/tweets/dtos/ITweetsDTO';
import Tweet from '../entities/Tweet';

class TweetRepository implements ITweetsRepository {
  private tweets: Tweet[] = [];

  public async findById(tweet_id: string): Promise<Tweet> {}

  public async create(content: ITweetsDTO): Promise<Tweet> {}

  public async save(tweet_id: string): Promise<Tweet> {}
}

export default TweetRepository;
