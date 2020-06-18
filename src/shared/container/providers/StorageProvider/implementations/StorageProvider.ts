import { Repository, getRepository } from 'typeorm';

import IStorageProvider from '../models/IStorageProvider';

import File from '../../infra/typeorm/entities/File';

class StorageProvider implements IStorageProvider {
  private ormRepository: Repository<File>;

  constructor() {
    this.ormRepository = getRepository(File);
  }

  public async saveFile(
    originalname: string,
    filename: string,
    user_id: string
  ): Promise<File | undefined> {
    const url = `http://localhost:3333/users/avatar/${filename}`;

    const file = await this.ormRepository.create({
      name: originalname,
      path: filename,
      url,
      user_id,
    });

    await this.ormRepository.save(file);

    return file;
  }
}

export default StorageProvider;
