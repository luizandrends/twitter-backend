import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get('/show', ensureAuthenticated, profileController.show);
profileRouter.put('/update', ensureAuthenticated, profileController.update);

export default profileRouter;
