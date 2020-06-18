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
    filename: string
  ): Promise<File | undefined> {
    const url = `http://localhost:3333/${originalname}`;

    const file = await this.ormRepository.create({
      name: originalname,
      path: filename,
      url,
    });

    await this.ormRepository.save(file);

    return file;
  }

  public async deleteFile(id: string): Promise<void> {
    const file = await this.ormRepository.findOne({
      where: { id },
    });

    console.log(file);
  }
}

export default StorageProvider;
