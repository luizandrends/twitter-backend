import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITweetsRepository from '../repositories/ITweetsRepository';
import ILikesRepository from '../repositories/ILikesRepository';

import Like from '../infra/typeorm/entities/Like';

interface IRequest {
  tweet_id: string;
}

@injectable()
class ListUsersLikesService {
  constructor(
    @inject('LikesRepository')
    private likesRepository: ILikesRepository,

    @inject('TweetsRepository')
    private tweetsRepository: ITweetsRepository
  ) {}

  public async execute({ tweet_id }: IRequest): Promise<Like[]> {
    const findTweet = await this.tweetsRepository.findById(tweet_id);

    if (!findTweet) {
      throw new AppError('Tweet not found', 400);
    }

    const userList = await this.likesRepository.listUsers(tweet_id);

    return userList;
  }
}

export default ListUsersLikesService;
