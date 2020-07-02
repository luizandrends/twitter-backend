import AppError from '@shared/errors/AppError';
import FakeTweetRepository from '../repositories/fakes/FakeTweetsRepository';
import CreateTweetService from './CreateTweetService';
import FakeLikesRepository from '../repositories/fakes/FakeLikesRepository';
import CreateLikeService from './CreateLikeService';

let createTweetService: CreateTweetService;
let fakeTweetRepository: FakeTweetRepository;

let fakeLikesRepository: FakeLikesRepository;
let createLikeService: CreateLikeService;

describe('CreateLike', () => {
  beforeEach(() => {
    fakeTweetRepository = new FakeTweetRepository();

    createTweetService = new CreateTweetService(fakeTweetRepository);

    fakeLikesRepository = new FakeLikesRepository();

    createLikeService = new CreateLikeService(
      fakeLikesRepository,
      fakeTweetRepository
    );
  });

  it('should be able to create a new like', async () => {
    const tweet = await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    const like = await createLikeService.execute({
      tweet_id: tweet.id,
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    expect(like).toHaveProperty('id');
  });

  it('should not be able to create a like if the tweet does not exists', async () => {
    await expect(
      createLikeService.execute({
        tweet_id: 'non-existing tweet',
        user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a like in the same tweet twice', async () => {
    const tweet = await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    await createLikeService.execute({
      tweet_id: tweet.id,
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    await expect(
      createLikeService.execute({
        tweet_id: tweet.id,
        user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
