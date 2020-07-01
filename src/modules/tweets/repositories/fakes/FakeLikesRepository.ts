import { uuid } from 'uuidv4';

import ILikesRepository from '../ILikesRepository';
import Like from '../../infra/typeorm/entities/Like';

class FakeLikesRepository implements ILikesRepository {
  private likes: Like[] = [];

  public async create(tweet_id: string): Promise<Like> {
    const like = new Like();

    Object.assign(like, { id: uuid(), tweet_id });

    this.likes.push(like);

    return like;
  }

  public async delete(tweet_id: string): Promise<void> {
    const findIndex = this.likes.findIndex(l => l.tweet_id === tweet_id);

    this.likes.splice(findIndex);
  }
}

export default FakeLikesRepository;
