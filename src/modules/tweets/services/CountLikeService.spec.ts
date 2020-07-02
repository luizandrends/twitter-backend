import FakeTweetsRepository from '../repositories/fakes/FakeTweetsRepository';
import CreateTweetService from './CreateTweetService';
import FakeLikesRepository from '../repositories/fakes/FakeLikesRepository';
import CountLikeService from './CountLikeService';
import CreateLikeService from './CreateLikeService';

let createTweetService: CreateTweetService;
let fakeTweetsRepository: FakeTweetsRepository;

let fakeLikesRepository: FakeLikesRepository;
let countLikeService: CountLikeService;

let createLikeService: CreateLikeService;

describe('CreateLike', () => {
  beforeEach(() => {
    fakeTweetsRepository = new FakeTweetsRepository();

    createTweetService = new CreateTweetService(fakeTweetsRepository);

    fakeLikesRepository = new FakeLikesRepository();

    countLikeService = new CountLikeService(
      fakeLikesRepository,
      fakeTweetsRepository
    );

    createLikeService = new CreateLikeService(
      fakeLikesRepository,
      fakeTweetsRepository
    );
  });

  it('should be able to count the likes', async () => {
    const countLikesSpy = jest.spyOn(fakeLikesRepository, 'countLikes');

    const tweet = await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    await createLikeService.execute({
      tweet_id: tweet.id,
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    const countLikes = await countLikeService.execute({
      tweet_id: tweet.id,
    });

    expect(countLikes).toBe(1);
    expect(countLikesSpy).toHaveBeenCalledWith(tweet.id);
  });
});
