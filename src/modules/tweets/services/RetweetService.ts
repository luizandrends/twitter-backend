import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITweetsRepository from '../repositories/ITweetsRepository';

import Tweet from '../infra/typeorm/entities/Tweet';

interface IRequest {
  tweet_id: string;
}

@injectable()
class RetweetService {
  constructor(
    @inject('TweetsRepository')
    private tweetsRepository: ITweetsRepository
  ) {}

  public async execute({ tweet_id }: IRequest): Promise<Tweet> {
    const findTweet = await this.tweetsRepository.findById(tweet_id);

    if (!findTweet) {
      throw new AppError('Tweet does not exists', 400);
    }

    const tweet = await this.tweetsRepository.create({
      content: findTweet.content,
      user_id: findTweet.user_id,
    });

    tweet.is_retweet = true;

    await this.tweetsRepository.save(tweet);

    return tweet;
  }
}

export default RetweetService;
