import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get('/show', ensureAuthenticated, profileController.show);
profileRouter.put(
  '/update',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      // old_password: Joi.string(),
      // password: Joi.string().min(6),
      // password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  ensureAuthenticated,
  profileController.update
);

export default profileRouter;
