import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute(user_id: string, password: string): Promise<void> {
    const findUser = await this.usersRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('You cannot delete an unexistent user', 400);
    }

    if (!password) {
      throw new AppError(
        'You must provide the password to delete an user',
        401
      );
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      findUser.password
    );

    if (!passwordMatch) {
      throw new AppError('Wrong password', 401);
    }

    await this.usersRepository.delete(user_id);
  }
}

export default DeleteUserService;
