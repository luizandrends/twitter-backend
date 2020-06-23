import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import StorageProvider from './StorageProvider/implementations/StorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import MailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  StorageProvider
);

container.registerInstance<IMailProvider>('MailProvider', new MailProvider());
