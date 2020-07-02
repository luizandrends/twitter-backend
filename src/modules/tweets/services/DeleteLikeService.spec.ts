import AppError from '@shared/errors/AppError';
import FakeTweetRepository from '../repositories/fakes/FakeTweetsRepository';
import CreateTweetService from './CreateTweetService';
import FakeLikesRepository from '../repositories/fakes/FakeLikesRepository';
import CreateLikeService from './CreateLikeService';
import DeleteLikeService from './DeleteLikeService';

let createTweetService: CreateTweetService;
let fakeTweetRepository: FakeTweetRepository;

let fakeLikesRepository: FakeLikesRepository;
let createLikeService: CreateLikeService;

let deleteLikeService: DeleteLikeService;

describe('CreateLike', () => {
  beforeEach(() => {
    fakeTweetRepository = new FakeTweetRepository();

    createTweetService = new CreateTweetService(fakeTweetRepository);

    fakeLikesRepository = new FakeLikesRepository();

    createLikeService = new CreateLikeService(
      fakeLikesRepository,
      fakeTweetRepository
    );

    deleteLikeService = new DeleteLikeService(fakeLikesRepository);
  });

  it('should be able to delete a like', async () => {
    const tweet = await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    const like = await createLikeService.execute({
      tweet_id: tweet.id,
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    await deleteLikeService.execute({
      like_id: like.id,
    });

    expect(like.deleted_at).toBe(like.deleted_at);
  });

  it('should not be able to unlike an unexistent like', async () => {
    await expect(
      deleteLikeService.execute({
        like_id: 'like-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
