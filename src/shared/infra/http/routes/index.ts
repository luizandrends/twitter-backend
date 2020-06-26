import { Router } from 'express';

import UserRoutes from '@modules/users/infra/http/routes/user.routes';
import SessionRoutes from '@modules/users/infra/http/routes/session.routes';
import PasswordRoutes from '@modules/users/infra/http/routes/password.routes';
import ProfileRoutes from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/sessions', SessionRoutes);
routes.use('/recovery', PasswordRoutes);
routes.use('/profile', ProfileRoutes);

export default routes;
