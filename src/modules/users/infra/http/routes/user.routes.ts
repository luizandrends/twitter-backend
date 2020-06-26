import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UserController from '../controllers/UserController';
import UpdateUserAvatarController from '../controllers/UpdateUserAvatarController';
import UpdateUserBackgroundController from '../controllers/UpdateUserBackgroundAvatarController';
import DeleteUserController from '../controllers/DeleteUserController';

const usersRouter = Router();
const upload = multer(uploadConfig);

const userController = new UserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const updateUserBackgroundAvatarController = new UpdateUserBackgroundController();
const deleteUserController = new DeleteUserController();

usersRouter.post(
  '/store',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().required().min(6),
    },
  }),
  userController.store
);

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

usersRouter.delete('/delete', ensureAuthenticated, deleteUserController.delete);

export default usersRouter;
