import AppError from '@shared/errors/AppError';
import FakeTweetRepository from '../repositories/fakes/FakeTweetsRepository';
import CreateTweetService from './CreateTweetService';
import FakeRetweetsRepository from '../repositories/fakes/FakeRetweetsRepository';
import CreateRetweet from './CreateRetweetService';

let createTweetService: CreateTweetService;
let fakeTweetRepository: FakeTweetRepository;

let fakeRetweetsRepository: FakeRetweetsRepository;
let createRetweetService: CreateRetweet;

describe('CreateRetweet', () => {
  beforeEach(() => {
    fakeTweetRepository = new FakeTweetRepository();

    createTweetService = new CreateTweetService(fakeTweetRepository);

    fakeRetweetsRepository = new FakeRetweetsRepository();

    createRetweetService = new CreateRetweet(
      fakeRetweetsRepository,
      fakeTweetRepository
    );
  });

  it('should be able to create a new retweet', async () => {
    const tweet = await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    const retweet = await createRetweetService.execute({
      tweet_id: tweet.id,
      user_id: '2bd14a8b-8788-46d5-866c-33c8e3f9a79a',
    });

    expect(retweet.retweet.tweet_id).toBe(tweet.id);
  });

  it('should not be able to create a retweet if the tweet does not exists', async () => {
    await expect(
      createRetweetService.execute({
        tweet_id: 'non-existing tweet',
        user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a retweet in the same tweet twice', async () => {
    const tweet = await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    await createRetweetService.execute({
      tweet_id: tweet.id,
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    await expect(
      createRetweetService.execute({
        tweet_id: tweet.id,
        user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
