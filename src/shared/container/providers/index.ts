import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import StorageProvider from './StorageProvider/implementations/StorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  StorageProvider
);
