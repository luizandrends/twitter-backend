import { injectable, inject } from 'tsyringe';

import ILikesRepository from '../repositories/ILikesRepository';

import Like from '../infra/typeorm/entities/Like';

interface IRequest {
  tweet_id: string;
}

@injectable()
class CreateLikeService {
  constructor(
    @inject('LikesRepository')
    private tweetsRepository: ILikesRepository
  ) {}

  public async execute({ tweet_id }: IRequest): Promise<Like> {
    const like = await this.tweetsRepository.create(tweet_id);

    return like;
  }
}

export default CreateLikeService;
