import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITweetsRepository from '../repositories/ITweetsRepository';
import IRetweetsRepository from '../repositories/IRetweetsRepository';

import Retweet from '../infra/typeorm/entities/Retweet';

interface IRequest {
  tweet_id: string;
}

@injectable()
class ListUsersRetweetService {
  constructor(
    @inject('LikesRepository')
    private retweetsRepository: IRetweetsRepository,

    @inject('TweetsRepository')
    private tweetsRepository: ITweetsRepository
  ) {}

  public async execute({ tweet_id }: IRequest): Promise<Retweet[]> {
    const findTweet = await this.tweetsRepository.findById(tweet_id);

    if (!findTweet) {
      throw new AppError('Tweet not found', 400);
    }

    const userList = await this.retweetsRepository.listUsers(tweet_id);

    return userList;
  }
}

export default ListUsersRetweetService;
