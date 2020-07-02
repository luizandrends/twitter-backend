import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import ITweetsRepository from '../repositories/ITweetsRepository';
import ILikesRepository from '../repositories/ILikesRepository';

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

  public async execute({ tweet_id }: IRequest): Promise<User[]> {
    const findTweet = await this.tweetsRepository.findById(tweet_id);

    if (!findTweet) {
      throw new AppError('Tweet not found', 400);
    }

    const userList = await this.likesRepository.listUsers(tweet_id);

    return userList;
  }
}

export default ListUsersLikesService;
