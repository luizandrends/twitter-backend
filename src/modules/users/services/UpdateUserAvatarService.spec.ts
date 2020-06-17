import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeStorageProvider: FakeStorageProvider;
let updateAvatar: UpdateUserAvatarService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    updateAvatar = new UpdateUserAvatarService(fakeStorageProvider);
  });

  it('should be able to update the avatar', async () => {
    const avatar = await updateAvatar.execute({
      originalname: 'originalname.jpg',
      filename: 'filename.jpg',
    });

    expect(avatar?.name).toBe('originalname.jpg');
  });
});
