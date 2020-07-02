import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateLikeController from '../controllers/CreateLikeController';

const createLikeController = new CreateLikeController();

const likeRouter = Router();

likeRouter.post('/create', ensureAuthenticated, createLikeController.create);

export default likeRouter;
