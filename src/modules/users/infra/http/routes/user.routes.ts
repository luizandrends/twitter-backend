import { Router } from 'express';

import UserController from '../controllers/UserController';

const usersRouter = Router();

const userController = new UserController();

usersRouter.post('/store', userController.store);

export default usersRouter;
