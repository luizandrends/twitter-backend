import File from '../typeorm/entities/File';

export default interface IStorageProvider {
  saveFile(originalname: string, filename: string): Promise<File>;
  deleteFile(id: string): Promise<void>;
}
