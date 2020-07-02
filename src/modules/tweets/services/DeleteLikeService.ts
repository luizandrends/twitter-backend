import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ILikesRepository from '../repositories/ILikesRepository';

interface IRequest {
  like_id: string;
}

@injectable()
class DeletLikeService {
  constructor(
    @inject('LikesRepository')
    private likesRepository: ILikesRepository
  ) {}

  public async execute({ like_id }: IRequest): Promise<void> {
    const like = await this.likesRepository.findLike(like_id);

    if (!like) {
      throw new AppError('You cannot unlike an unexistent like', 401);
    }

    like.deleted_at = new Date();

    this.likesRepository.save(like);
  }
}

export default DeletLikeService;
