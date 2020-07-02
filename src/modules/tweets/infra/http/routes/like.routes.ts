import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateLikeController from '../controllers/CreateLikeController';
import CountLikeController from '../controllers/CountLikeController';

const createLikeController = new CreateLikeController();
const countLikeController = new CountLikeController();

const likeRouter = Router();

likeRouter.post(
  '/create/:tweet_id',
  ensureAuthenticated,
  createLikeController.create
);

likeRouter.get(
  '/count/:tweet_id',
  ensureAuthenticated,
  countLikeController.create
);

export default likeRouter;
