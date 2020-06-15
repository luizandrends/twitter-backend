import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: '@johndoe',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
  });

  it('sould not be able to create a new user with a repeated email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

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
        username: '@johndoe',
        password: '1234',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('sould not be able to create a new user with a repeated username', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

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
