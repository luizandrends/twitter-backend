import { Router } from 'express';

import UserRoutes from '@modules/users/infra/http/routes/user.routes';
import SessionRoutes from '@modules/users/infra/http/routes/session.routes';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/sessions', SessionRoutes);

export default routes;
