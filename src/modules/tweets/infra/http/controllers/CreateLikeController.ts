import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateLikeService from '@modules/tweets/services/CreateLikeService';

class CreateLikeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { tweet_id } = request.params;

    const createLike = container.resolve(CreateLikeService);

    const like = await createLike.execute({
      tweet_id,
      user_id: request.user.id,
    });

    return response.json(like);
  }
}

export default CreateLikeController;
