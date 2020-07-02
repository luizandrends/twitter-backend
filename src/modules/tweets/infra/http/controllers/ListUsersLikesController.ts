import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListUsersLikesService from '@modules/tweets/services/ListUsersLikesService';

class ListUserLikesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { tweet_id } = request.params;

    const listUsers = container.resolve(ListUsersLikesService);

    const like = await listUsers.execute({
      tweet_id,
    });

    return response.json(like);
  }
}

export default ListUserLikesController;
