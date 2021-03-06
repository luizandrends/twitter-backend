import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import ILikesRepository from '../ILikesRepository';
import Like from '../../infra/typeorm/entities/Like';

class FakeLikesRepository implements ILikesRepository {
  private likes: Like[] = [];

  private users: User[] = [];

  public async create(tweet_id: string, user_id: string): Promise<Like> {
    const like = new Like();
    const user = new User();

    Object.assign(like, { id: uuid(), tweet_id, user_id });

    this.likes.push(like);

    Object.assign(user, {
      id: user_id,
      name: 'John Doe',
      username: '@johndoe',
      password: '123456',
    });

    this.users.push(user);

    return like;
  }

  public async countLikes(tweet_id: string): Promise<number> {
    return this.likes.length;
  }

  public async listUsers(tweet_id: string): Promise<Like[]> {
    const likes = this.likes.filter(l => {
      return l.tweet_id === tweet_id && l.user_id;
    });

    return likes;
  }

  public async save(like: Like): Promise<void> {
    const findIndex = this.likes.findIndex(l => l.id === like.id);

    this.likes[findIndex] = like;
  }

  public async hasLike(
    tweet_id: string,
    user_id: string
  ): Promise<Like | undefined> {
    const findLike = this.likes.find(
      l => l.tweet_id === tweet_id && l.user_id === user_id
    );

    return findLike;
  }

  public async findLike(like_id: string): Promise<Like | undefined> {
    const findLike = this.likes.find(l => l.id === like_id);

    return findLike;
  }
}

export default FakeLikesRepository;
