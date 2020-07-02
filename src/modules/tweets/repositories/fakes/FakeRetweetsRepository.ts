import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import Retweet from '../../infra/typeorm/entities/Retweet';

import IRetweetsRepository from '../IRetweetsRepository';

class FakeRetweetsRepository implements IRetweetsRepository {
  private retweets: Retweet[] = [];

  private users: User[] = [];

  public async create(tweet_id: string, user_id: string): Promise<Retweet> {
    const retweet = new Retweet();
    const user = new User();

    Object.assign(retweet, { id: uuid(), tweet_id, user_id });

    this.retweets.push(retweet);

    Object.assign(user, {
      id: user_id,
      name: 'John Doe',
      username: '@johndoe',
      password: '123456',
    });

    this.users.push(user);

    return retweet;
  }

  public async countRetweets(tweet_id: string): Promise<number> {
    return this.retweets.length;
  }

  public async listUsers(tweet_id: string): Promise<Retweet[]> {
    const retweets = this.retweets.filter(r => {
      return r.tweet_id === tweet_id && r.user_id;
    });

    return retweets;
  }

  public async save(retweet: Retweet): Promise<void> {
    const findIndex = this.retweets.findIndex(r => r.id === retweet.id);

    this.retweets[findIndex] = retweet;
  }

  public async hasRetweet(
    tweet_id: string,
    user_id: string
  ): Promise<Retweet | undefined> {
    console.log('asdas', tweet_id, user_id);

    const findRetweet = this.retweets.find(
      r => r.tweet_id === tweet_id && r.user_id === user_id
    );

    return findRetweet;
  }

  public async findRetweet(retweet_id: string): Promise<Retweet | undefined> {
    const findRetweet = this.retweets.find(t => t.id === retweet_id);

    return findRetweet;
  }
}

export default FakeRetweetsRepository;
