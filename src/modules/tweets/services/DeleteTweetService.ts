import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITweetsRepository from '../repositories/ITweetsRepository';

interface IRequest {
  tweet_id: string;
}

@injectable()
class DeleteTweetService {
  constructor(
    @inject('TweetsRepository')
    private tweetsRepository: ITweetsRepository
  ) {}

  public async execute({ tweet_id }: IRequest): Promise<void> {
    const tweet = await this.tweetsRepository.findById(tweet_id);

    if (!tweet) {
      throw new AppError('You cannot delete an unexistent tweet');
    }

    tweet.deleted_at = new Date();

    await this.tweetsRepository.save(tweet);
  }
}

export default DeleteTweetService;
