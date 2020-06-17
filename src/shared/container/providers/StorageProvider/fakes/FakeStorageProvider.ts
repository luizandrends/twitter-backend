import { uuid } from 'uuidv4';

import IStorageProvider from '../models/IStorageProvider';

import File from '../typeorm/entities/File';

class FakeStorageProvider implements IStorageProvider {
  private storage: File[] = [];

  public async saveFile(
    originalname: string,
    filename: string
  ): Promise<File | undefined> {
    const url = `http://localhost:3333/${originalname}`;

    const file = new File();

    Object.assign(
      file,
      { id: uuid(), name: originalname, path: filename },
      url
    );

    return file;
  }

  public async deleteFile(id: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile.id === id
    );

    this.storage.splice(findIndex, 1);
  }
}

export default FakeStorageProvider;
