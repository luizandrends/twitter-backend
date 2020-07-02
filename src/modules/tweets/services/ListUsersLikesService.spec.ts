import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeTweetsRepository from '../repositories/fakes/FakeTweetsRepository';
import FakeLikesRepository from '../repositories/fakes/FakeLikesRepository';
import ListUsersLikesService from './ListUsersLikesService';
import CreateLikeService from './CreateLikeService';
import CreateTweetService from './CreateTweetService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

let createTweetService: CreateTweetService;
let fakeTweetsRepository: FakeTweetsRepository;

let fakeLikesRepository: FakeLikesRepository;
let listUserLikesService: ListUsersLikesService;

let createLikeService: CreateLikeService;

describe('CreateLike', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    fakeTweetsRepository = new FakeTweetsRepository();

    createTweetService = new CreateTweetService(fakeTweetsRepository);

    fakeLikesRepository = new FakeLikesRepository();

    listUserLikesService = new ListUsersLikesService(
      fakeLikesRepository,
      fakeTweetsRepository
    );

    createLikeService = new CreateLikeService(
      fakeLikesRepository,
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

    const like = await createLikeService.execute({
      tweet_id: tweet.id,
      user_id: user.id,
    });

    const listUsers = await listUserLikesService.execute({
      tweet_id: tweet.id,
    });

    expect(listUsers).toEqual([
      {
        id: like.id,
        tweet_id: tweet.id,
        user_id: user.id,
      },
    ]);
  });

  it('should not be able to list the users from an unexistent tweet', async () => {
    await expect(
      listUserLikesService.execute({
        tweet_id: 'non-existing tweet',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
