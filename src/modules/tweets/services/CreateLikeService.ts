import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Like from '../infra/typeorm/entities/Like';

import ITweetsRepository from '../repositories/ITweetsRepository';
import ILikesRepository from '../repositories/ILikesRepository';

interface IRequest {
  tweet_id: string;
  user_id: string;
}

@injectable()
class CreateLikeService {
  constructor(
    @inject('LikesRepository')
    private likesRepository: ILikesRepository,

    @inject('TweetsRepository')
    private tweetsRepository: ITweetsRepository
  ) {}

  public async execute({ tweet_id, user_id }: IRequest): Promise<Like> {
    const findTweet = await this.tweetsRepository.findById(tweet_id);

    if (!findTweet) {
      throw new AppError('Tweet not found', 400);
    }

    const like = await this.likesRepository.create(tweet_id, user_id);

    return like;
  }
}

export default CreateLikeService;
