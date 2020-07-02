import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateLikeController from '../controllers/CreateLikeController';
import CountLikeController from '../controllers/CountLikeController';
import DeleteLikeController from '../controllers/DeleteLikeController';

const createLikeController = new CreateLikeController();
const countLikeController = new CountLikeController();
const deleteLikeController = new DeleteLikeController();

const likeRouter = Router();

likeRouter.post(
  '/create/:tweet_id',
  ensureAuthenticated,
  createLikeController.create
);

likeRouter.get(
  '/count/:tweet_id',
  ensureAuthenticated,
  countLikeController.count
);

likeRouter.delete(
  '/count/:tweet_id',
  ensureAuthenticated,
  deleteLikeController.delete
);

export default likeRouter;
