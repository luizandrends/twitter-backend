import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITweetsRepository from '../repositories/ITweetsRepository';
import ITweetsDTO from '../dtos/ITweetsDTO';

import Tweet from '../infra/typeorm/entities/Tweet';

interface IRequest extends ITweetsDTO {
  content: string;
}

@injectable()
class CreateTweetService {
  constructor(
    @inject('TweetsRepository')
    private tweetsRepository: ITweetsRepository
  ) {}

  public async execute({ content }: IRequest): Promise<Tweet> {
    const findTweet = await this.tweetsRepository.findByContent(content);

    if (findTweet) {
      throw new AppError('You already tweeted this', 400);
    }

    const tweet = this.tweetsRepository.create({ content });

    return tweet;
  }
}

export default CreateTweetService;
