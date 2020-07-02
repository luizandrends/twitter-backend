import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteLikeService from '@modules/tweets/services/DeleteLikeService';

class DeleteLikeController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { tweet_id } = request.params;
    const { like_id } = request.body;

    const deleteLike = container.resolve(DeleteLikeService);

    const like = await deleteLike.execute({
      like_id,
      tweet_id,
    });

    return response.json(like);
  }
}

export default DeleteLikeController;
