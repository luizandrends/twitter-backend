import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITweetsRepository from '../repositories/ITweetsRepository';
import IRetweetsRepository from '../repositories/IRetweetsRepository';

interface IRequest {
  tweet_id: string;
}

@injectable()
class CountRetweetService {
  constructor(
    @inject('LikesRepository')
    private likesRepository: IRetweetsRepository,

    @inject('TweetsRepository')
    private tweetsRepository: ITweetsRepository
  ) {}

  public async execute({ tweet_id }: IRequest): Promise<number> {
    const findTweet = await this.tweetsRepository.findById(tweet_id);

    if (!findTweet) {
      throw new AppError('Tweet not found', 400);
    }

    const like = await this.likesRepository.countRetweets(tweet_id);

    return like;
  }
}

export default CountRetweetService;
