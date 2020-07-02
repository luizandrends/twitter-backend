import AppError from '@shared/errors/AppError';
import FakeTweetsRepository from '../repositories/fakes/FakeTweetsRepository';
import CreateTweetService from './CreateTweetService';
import FakeLikesRepository from '../repositories/fakes/FakeLikesRepository';
import ListUsersLikesService from './ListUsersLikesService';
import CreateLikeService from './CreateLikeService';

let createTweetService: CreateTweetService;
let fakeTweetsRepository: FakeTweetsRepository;

let fakeLikesRepository: FakeLikesRepository;
let listUserLikesService: ListUsersLikesService;

let createLikeService: CreateLikeService;

describe('CreateLike', () => {
  beforeEach(() => {
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
    const listUsersLike = jest.spyOn(fakeLikesRepository, 'listUsers');

    const tweet = await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    await createLikeService.execute({
      tweet_id: tweet.id,
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    const listUsers = await listUserLikesService.execute({
      tweet_id: tweet.id,
    });

    expect(listUsers).toEqual([
      {
        id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
        name: 'John Doe',
        password: '123',
        username: '@johndoe',
      },
    ]);
    expect(listUsersLike).toHaveBeenCalledWith(tweet.id);
  });

  it('should not be able to list the users from an unexistent tweet', async () => {
    await expect(
      listUserLikesService.execute({
        tweet_id: 'non-existing tweet',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
