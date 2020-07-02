import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteLikeService from '@modules/tweets/services/DeleteLikeService';

class DeleteLikeController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { like_id } = request.params;

    const deleteLike = container.resolve(DeleteLikeService);

    const like = await deleteLike.execute({
      like_id,
    });

    return response.json(like);
  }
}

export default DeleteLikeController;
