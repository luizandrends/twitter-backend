import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import File from '@shared/container/providers/infra/typeorm/entities/File';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  originalname: string;
  filename: string;
  user_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    originalname,
    filename,
    user_id,
  }: IRequest): Promise<File | undefined> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('You cannot update the avatar of an unexistent user');
    }

    const file = await this.storageProvider.saveFile(
      originalname,
      filename,
      user_id
    );

    user.avatar_id = file?.id as string;

    this.usersRepository.save(user);

    return file;
  }
}

export default CreateUserService;
