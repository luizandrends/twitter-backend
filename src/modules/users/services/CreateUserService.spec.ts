import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: '@johndoe',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
  });

  it('sould not be able to create a new user with a repeated email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: '@johndoe',
      password: '1234',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        username: '@anotherusername',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('sould not be able to create a new user with a repeated username', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: '@johndoe',
      password: '1234',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        username: '@johndoe',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
