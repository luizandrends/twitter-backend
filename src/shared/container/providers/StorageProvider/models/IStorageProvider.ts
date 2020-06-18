import File from '../../infra/typeorm/entities/File';

export default interface IStorageProvider {
  saveFile(originalname: string, filename: string): Promise<File | undefined>;
  deleteFile(id: string): Promise<void>;
}
