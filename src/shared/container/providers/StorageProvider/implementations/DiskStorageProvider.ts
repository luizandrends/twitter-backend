import fs from 'fs';
import path from 'path';

import { getRepository, Repository } from 'typeorm';

import uploadConfig from '@config/upload';

import IStorageProvider from '../models/IStorageProvider';
import File from '../typeorm/entities/File';

interface IFile {
  fileName: string;
  filePath: string;
}

class DiskStorageProvider implements IStorageProvider {
  private ormRepository: Repository<File>;

  constructor() {
    this.ormRepository = getRepository(File);
  }

  public async saveFile(fileName: string, filePath: string): Promise<File> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, fileName),
      path.resolve(uploadConfig.uploadsFolder, fileName)
    );

    const file = await this.ormRepository.create({
      name: fileName,
      path: filePath,
      url: `http://localhost:3333/${fileName}`,
    });

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
