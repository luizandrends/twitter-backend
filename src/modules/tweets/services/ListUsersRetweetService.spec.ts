import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeTweetsRepository from '../repositories/fakes/FakeTweetsRepository';
import FakeRetweetsRepository from '../repositories/fakes/FakeRetweetsRepository';
import ListUsersRetweetService from './ListUsersRetweetService';
import CreateRetweetService from './CreateRetweetService';
import CreateTweetService from './CreateTweetService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

let createTweetService: CreateTweetService;
let fakeTweetsRepository: FakeTweetsRepository;

let fakeRetweetsRepository: FakeRetweetsRepository;
let listUserRetweetService: ListUsersRetweetService;

let createRetweetService: CreateRetweetService;

describe('CreateLike', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    fakeTweetsRepository = new FakeTweetsRepository();

    createTweetService = new CreateTweetService(fakeTweetsRepository);

    fakeRetweetsRepository = new FakeRetweetsRepository();

    listUserRetweetService = new ListUsersRetweetService(
      fakeRetweetsRepository,
      fakeTweetsRepository
    );

    createRetweetService = new CreateRetweetService(
      fakeRetweetsRepository,
      fakeTweetsRepository
    );
  });

  it('should be able to list the list of users who liked a tweet', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      username: '@johndoe',
      password: '1234',
    });

    const tweet = await createTweetService.execute({
      user_id: user.id,
      content: 'Hy, my name is John Doe',
    });

    const retweet = await createRetweetService.execute({
      tweet_id: tweet.id,
      user_id: user.id,
    });

    const listUsers = await listUserRetweetService.execute({
      tweet_id: tweet.id,
    });

    expect(listUsers).toEqual([
      {
        id: retweet.retweet.id,
        tweet_id: tweet.id,
        user_id: user.id,
      },
    ]);
  });

  it('should not be able to list the users from an unexistent tweet', async () => {
    await expect(
      listUserRetweetService.execute({
        tweet_id: 'non-existing tweet',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
