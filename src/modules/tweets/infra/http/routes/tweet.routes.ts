import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateTweetController from '../controllers/CreateTweetController';
import DeleteTweetController from '../controllers/DeleteTweetController';

const createTweetController = new CreateTweetController();
const deleteTweetController = new DeleteTweetController();

const tweetRouter = Router();

tweetRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      content: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  createTweetController.create
);

tweetRouter.delete(
  '/delete/:tweet_id',
  celebrate({
    [Segments.PARAMS]: {
      tweet_id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  deleteTweetController.delete
);

export default tweetRouter;
