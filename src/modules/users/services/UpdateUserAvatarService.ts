import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import File from '@shared/container/providers/infra/typeorm/entities/File';

interface IRequest {
  originalname: string;
  filename: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    originalname,
    filename,
  }: IRequest): Promise<File | undefined> {
    const file = await this.storageProvider.saveFile(originalname, filename);

    return file;
  }
}

export default CreateUserService;
