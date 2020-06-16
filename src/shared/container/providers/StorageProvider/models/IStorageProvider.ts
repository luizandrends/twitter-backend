import File from '../typeorm/entities/File';

export default interface IStorageProvider {
  saveFile(fileName: string, filePath: string): Promise<File>;
  deleteFile(file: string): Promise<void>;
}
