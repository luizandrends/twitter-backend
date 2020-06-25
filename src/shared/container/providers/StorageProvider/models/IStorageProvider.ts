import File from '../infra/typeorm/entities/File';

export default interface IStorageProvider {
  saveFile(
    originalname: string,
    filename: string,
    user_id: string
  ): Promise<File | undefined>;
}
