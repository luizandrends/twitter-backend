import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UserController from '../controllers/UserController';
import UpdateUserAvatarController from '../controllers/UpdateUserAvatarController';
import UpdateUserBackgroundController from '../controllers/UpdateUserBackgroundAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const userController = new UserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const updateUserBackgroundAvatarController = new UpdateUserBackgroundController();

usersRouter.post('/store', userController.store);

usersRouter.patch(
  '/avatar',
  upload.single('file'),
  ensureAuthenticated,
  updateUserAvatarController.update
);

usersRouter.patch(
  '/background',
  upload.single('file'),
  ensureAuthenticated,
  updateUserBackgroundAvatarController.update
);

export default usersRouter;
