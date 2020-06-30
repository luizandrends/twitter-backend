import { getRepository, Repository } from 'typeorm';

import ITweetsRepository from '@modules/tweets/repositories/ITweetsRepository';
import ITweetsDTO from '@modules/tweets/dtos/ITweetsDTO';

import Tweet from '../entities/Tweet';

class TweetsRepository implements ITweetsRepository {
  private ormRepository: Repository<Tweet>;

  constructor() {
    this.ormRepository = getRepository(Tweet);
  }

  public async findById(tweet_id: string): Promise<Tweet | undefined> {
    const tweet = await this.ormRepository.findOne({
      where: { id: tweet_id },
    });

    return tweet;
  }

  public async findByContent(content: string): Promise<Tweet | undefined> {
    const tweet = await this.ormRepository.findOne({
      where: { content },
    });

    return tweet;
  }

  public async create({ content, user_id }: ITweetsDTO): Promise<Tweet> {
    const tweet = await this.ormRepository.create({
      content,
      user_id,
    });

    await this.ormRepository.save(tweet);

    return tweet;
  }

  public async save(tweet: Tweet): Promise<Tweet> {
    return this.ormRepository.save(tweet);
  }
}

export default TweetsRepository;
