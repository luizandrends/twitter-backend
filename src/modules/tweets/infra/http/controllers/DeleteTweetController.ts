import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteTweetService from '@modules/tweets/services/DeleteTweetService';

class DeleteTweetController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { tweet_id } = request.params;
    const user_id = request.user.id;

    const deleteTweet = container.resolve(DeleteTweetService);

    const tweet = await deleteTweet.execute({
      tweet_id,
      user_id,
    });

    return response.json(tweet);
  }
}

export default DeleteTweetController;
