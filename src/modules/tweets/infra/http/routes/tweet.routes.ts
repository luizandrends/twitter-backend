import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import CreateTweetController from '../controllers/CreateTweetController';

const createTweetController = new CreateTweetController();

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

export default tweetRouter;
