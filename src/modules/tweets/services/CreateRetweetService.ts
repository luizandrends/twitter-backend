import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRetweetsRepository from '../repositories/IRetweetsRepository';
import ITweetsRepository from '../repositories/ITweetsRepository';

import Tweet from '../infra/typeorm/entities/Tweet';
import Retweet from '../infra/typeorm/entities/Retweet';

interface IRequest {
  tweet_id: string;
  user_id: string;
}

interface IResponse {
  tweet: Tweet;
  retweet: Retweet;
}

@injectable()
class RetweetService {
  constructor(
    @inject('RetweetsRepository')
    private retweetsRepository: IRetweetsRepository,

    @inject('TweetsRepository')
    private tweetsRepository: ITweetsRepository
  ) {}

  public async execute({ tweet_id, user_id }: IRequest): Promise<IResponse> {
    const findTweet = await this.tweetsRepository.findById(tweet_id);

    if (!findTweet) {
      throw new AppError('Tweet does not exists', 400);
    }

    const findRetweet = await this.retweetsRepository.hasRetweet(
      tweet_id,
      user_id
    );

    if (findRetweet) {
      throw new AppError('You cannot retweet two times the same tweet', 400);
    }

    const tweet = await this.tweetsRepository.create({
      content: findTweet.content,
      user_id: findTweet.user_id,
    });

    tweet.is_retweet = true;

    await this.tweetsRepository.save(tweet);

    const retweet = await this.retweetsRepository.create(tweet_id, user_id);

    await this.retweetsRepository.save(retweet);

    return { tweet, retweet };
  }
}

export default RetweetService;
