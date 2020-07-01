import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

import AppError from '@shared/errors/AppError';
import FakeTweetsRepository from '../repositories/fakes/FakeTweetsRepository';
import CreateTweetService from './CreateTweetService';
import DeleteTweetService from './DeleteTweetService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

let createTweetService: CreateTweetService;
let fakeTweetsRepository: FakeTweetsRepository;

let deleteTweetService: DeleteTweetService;

describe('CreateTweet', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    fakeTweetsRepository = new FakeTweetsRepository();

    createTweetService = new CreateTweetService(fakeTweetsRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    deleteTweetService = new DeleteTweetService(fakeTweetsRepository);
  });

  it('should be able to delete my onw tweets', async () => {
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
      user_id: user.id,
    });

    expect(tweet).toHaveProperty('deleted_at');
  });

  it('should not be able to delete a tweet with an invalid tweet id', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: '@johndoe',
      password: '1234',
    });

    await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: user.id,
    });

    await expect(
      deleteTweetService.execute({
        tweet_id: 'invalid-tweet-id',
        user_id: user.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a tweet from other user id', async () => {
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

    await expect(
      deleteTweetService.execute({
        tweet_id: tweet.id,
        user_id: 'id-from-another-user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
