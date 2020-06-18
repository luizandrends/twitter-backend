import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UserController from '../controllers/UserController';
import UpdateUserAvatarController from '../controllers/UpdateUserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const userController = new UserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post('/store', userController.store);
usersRouter.patch(
  '/avatar',
  upload.single('file'),
  ensureAuthenticated,
  updateUserAvatarController.update
);

export default usersRouter;
