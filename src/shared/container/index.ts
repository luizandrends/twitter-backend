import { container } from 'tsyringe';

import '@modules/users/providers/index';
import './providers/index';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// import IUserTokens from '@modules/users/repositories/IUserTokensRepository';
// import UserTokensRepositories from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
