import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ITweetsRepository from '../repositories/ITweetsRepository';
import ILikesRepository from '../repositories/ILikesRepository';

interface IRequest {
  tweet_id: string;
  like_id: string;
}

@injectable()
class DeletLikeService {
  constructor(
    @inject('LikesRepository')
    private likesRepository: ILikesRepository,

    @inject('TweetsRepository')
    private tweetsRepository: ITweetsRepository
  ) {}

  public async execute({ like_id, tweet_id }: IRequest): Promise<void> {
    const findTweet = await this.tweetsRepository.findById(tweet_id);

    if (!findTweet) {
      throw new AppError('Tweet not found', 400);
    }

    await this.likesRepository.delete(like_id);
  }
}

export default DeletLikeService;
