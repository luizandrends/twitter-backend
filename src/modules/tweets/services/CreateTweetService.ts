import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITweetsRepository from '../repositories/ITweetsRepository';

import Tweet from '../infra/typeorm/entities/Tweet';

interface IRequest {
  content: string;
  user_id: string;
}

@injectable()
class CreateTweetService {
  constructor(
    @inject('TweetsRepository')
    private tweetsRepository: ITweetsRepository
  ) {}

  public async execute({ content, user_id }: IRequest): Promise<Tweet> {
    const findTweet = await this.tweetsRepository.findByContent(content);

    if (findTweet) {
      throw new AppError('You already tweeted this', 400);
    }

    const tweet = this.tweetsRepository.create({
      content,
      user_id,
    });

    return tweet;
  }
}

export default CreateTweetService;
