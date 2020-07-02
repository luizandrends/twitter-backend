import { Router } from 'express';

import UserRoutes from '@modules/users/infra/http/routes/user.routes';
import SessionRoutes from '@modules/users/infra/http/routes/session.routes';
import PasswordRoutes from '@modules/users/infra/http/routes/password.routes';
import ProfileRoutes from '@modules/users/infra/http/routes/profile.routes';

import TweetsRoutes from '@modules/tweets/infra/http/routes/tweet.routes';
import LikeRoutes from '@modules/tweets/infra/http/routes/like.routes';

const routes = Router();

routes.use('/users', UserRoutes);
routes.use('/sessions', SessionRoutes);
routes.use('/recovery', PasswordRoutes);
routes.use('/profile', ProfileRoutes);

routes.use('/tweets', TweetsRoutes);
routes.use('/likes', LikeRoutes);

export default routes;
