import { uuid } from 'uuidv4';

import ITweetsRepository from '../ITweetsRepository';
import ITweetsDTO from '../../dtos/ITweetsDTO';
import Tweet from '../../infra/typeorm/entities/Tweet';

class FakeTweetRepository implements ITweetsRepository {
  private tweets: Tweet[] = [];

  public async findById(tweet_id: string): Promise<Tweet | undefined> {
    const findTweet = this.tweets.find(t => t.id === tweet_id);

    return findTweet;
  }

  public async findByContent(content: string): Promise<Tweet | undefined> {
    const findTweet = this.tweets.find(t => t.content === content);

    return findTweet;
  }

  public async create(content: ITweetsDTO): Promise<Tweet> {
    const tweet = new Tweet();

    Object.assign(tweet, { id: uuid() }, content);

    this.tweets.push(tweet);

    return tweet;
  }

  public async save(tweet: Tweet): Promise<Tweet> {
    const findIndex = this.tweets.findIndex(t => t.id === tweet.id);

    this.tweets[findIndex] = tweet;

    return tweet;
  }
}

export default FakeTweetRepository;
