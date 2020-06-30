import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

import FakeTweetRepository from '../repositories/fakes/FakeTweetRepository';
import CreateTweetService from './CreateTweetService';
import DeleteTweetService from './DeleteTweetService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

let createTweetService: CreateTweetService;
let fakeTweetRepository: FakeTweetRepository;

let deleteTweetService: DeleteTweetService;

describe('CreateTweet', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    fakeTweetRepository = new FakeTweetRepository();

    createTweetService = new CreateTweetService(fakeTweetRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    deleteTweetService = new DeleteTweetService(fakeTweetRepository);
  });

  it('should be able to delete an tweet', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: '@johndoe',
      password: '1234',
    });

    const tweet = await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: user.id,
    });

    await deleteTweetService.execute({
      tweet_id: tweet.id,
    });

    expect(tweet).toHaveProperty('deleted_at');
  });
});
