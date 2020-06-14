import { Router } from 'express';


import UserController from '../controllers/UserController';

const usersRouter = Router();
const userController = new UserController();

usersRouter.post('/create', userController.store);

export default usersRouter;