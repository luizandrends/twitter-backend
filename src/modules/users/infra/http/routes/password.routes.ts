import { Router } from 'express';

import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const sessionController = new ForgotPasswordController();

passwordRouter.post('/forgot', sessionController.create);

export default passwordRouter;
