import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  path: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, name, path }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('You cant update the avatar of an unexistent user');
    }

    const avatarId = user.avatar_id;

    if (avatarId) {
      await this.storageProvider.deleteFile(avatarId);
    }

    const createFile = await this.storageProvider.saveFile(name, path);

    user.avatar_id = createFile.id;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
