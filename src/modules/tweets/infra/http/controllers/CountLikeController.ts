import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CountLikeService from '@modules/tweets/services/CountLikeService';

class CountLikeController {
  public async count(request: Request, response: Response): Promise<Response> {
    const { tweet_id } = request.params;

    const countLike = container.resolve(CountLikeService);

    const like = await countLike.execute({
      tweet_id,
    });

    return response.json(like);
  }
}

export default CountLikeController;
