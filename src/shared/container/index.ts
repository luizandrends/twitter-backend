import { container } from 'tsyringe';

import '@modules/users/providers/index';
import './providers/index';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokens from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepositories from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

// import ITweetsRepository from '@modules/tweets/repositories/ITweetsRepository';
// import TweetsRepository from '@modules/tweets/infra/typeorm/repositories/TweetsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokens>(
  'UserTokensRepository',
  UserTokensRepositories
);

// container.registerSingleton<ITweetsRepository>(
//   'TweetsRepository',
//   TweetsRepository
// );
