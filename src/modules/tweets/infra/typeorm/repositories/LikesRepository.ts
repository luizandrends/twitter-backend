import { Repository, getRepository } from 'typeorm';

import ILikesRepository from '@modules/tweets/repositories/ILikesRepository';
import Like from '../entities/Like';

class FakeLikesRepository implements ILikesRepository {
  private ormRepository: Repository<Like>;

  constructor() {
    this.ormRepository = getRepository(Like);
  }

  public async create(tweet_id: string, user_id: string): Promise<Like> {
    const like = this.ormRepository.create({
      tweet_id,
      user_id,
    });

    await this.ormRepository.save(like);

    return like;
  }

  public async countLikes(tweet_id: string): Promise<number> {
    const countLikes = await this.ormRepository.count({
      where: { tweet_id },
    });

    return countLikes;
  }

  public async listUsers(tweet_id: string): Promise<Like[]> {
    const userList = await this.ormRepository.find({
      where: { tweet_id },
      relations: ['user'],
    });

    return userList;
  }

  public async save(like: Like): Promise<void> {
    await this.ormRepository.save(like);
  }

  public async hasLike(
    tweet_id: string,
    user_id: string
  ): Promise<Like | undefined> {
    const findLike = await this.ormRepository.findOne({
      where: { tweet_id, user_id },
    });

    console.log(findLike);

    return findLike;
  }

  public async findLike(like_id: string): Promise<Like | undefined> {
    const findLike = await this.ormRepository.findOne({
      where: { id: like_id },
    });

    return findLike;
  }
}

export default FakeLikesRepository;
