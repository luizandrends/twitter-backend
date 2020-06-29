import { injectable, inject } from 'tsyringe';

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
    const tweet = this.tweetsRepository.create({ content });

    return tweet;
  }
}

export default CreateTweetService;
