import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateUserBackgroundService from './UpdateUserBackgroundService';
import CreateUser from './CreateUserService';

let fakeStorageProvider: FakeStorageProvider;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;

let createUser: CreateUser;
let updateBackground: UpdateUserBackgroundService;

describe('UpdateBackground', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUser(fakeUsersRepository, fakeHashProvider);

    updateBackground = new UpdateUserBackgroundService(
      fakeStorageProvider,
      fakeUsersRepository
    );
  });

  it('should be able to update the background', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: '@johndoe',
      password: '1234',
    });

    const avatar = await updateBackground.execute({
      originalname: 'originalname.jpg',
      filename: 'filename.jpg',
      user_id: user.id,
    });

    expect(avatar?.name).toBe('originalname.jpg');
  });

  it('should not be able to update a background from an unexistent user', async () => {
    expect(
      updateBackground.execute({
        originalname: 'originalname.jpg',
        filename: 'filename.jpg',
        user_id: 'non-existing-user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
