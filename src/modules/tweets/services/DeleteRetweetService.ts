import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IRetweetsRepository from '../repositories/IRetweetsRepository';

interface IRequest {
  retweet_id: string;
}

@injectable()
class DeletLikeService {
  constructor(
    @inject('LikesRepository')
    private retweetsRepository: IRetweetsRepository
  ) {}

  public async execute({ retweet_id }: IRequest): Promise<void> {
    const retweet = await this.retweetsRepository.findRetweet(retweet_id);

    if (!retweet) {
      throw new AppError('You cannot unlike an unexistent like', 401);
    }

    retweet.deleted_at = new Date();

    this.retweetsRepository.save(retweet);
  }
}

export default DeletLikeService;
