import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserService from '../services/CreateUserService'

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUser = new CreateUserService(fakeUsersRepository);
  })

  it('should be able to create a new user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: '@johndoe',
      password: '1234'
    })

    expect(user).toHaveProperty('id')
  })
})
