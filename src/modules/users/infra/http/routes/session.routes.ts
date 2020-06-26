import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post(
  '/store',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.store
);

export default sessionsRouter;
