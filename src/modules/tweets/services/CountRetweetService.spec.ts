import AppError from '@shared/errors/AppError';
import FakeTweetsRepository from '../repositories/fakes/FakeTweetsRepository';
import CreateTweetService from './CreateTweetService';
import FakeRetweetsRepository from '../repositories/fakes/FakeRetweetsRepository';
import CountRetweetService from './CountRetweetService';
import CreateRetweetService from './CreateRetweetService';

let createTweetService: CreateTweetService;
let fakeTweetsRepository: FakeTweetsRepository;

let fakeRetweetsRepository: FakeRetweetsRepository;
let countRetweet: CountRetweetService;

let createRetweetService: CreateRetweetService;

describe('CountTweets', () => {
  beforeEach(() => {
    fakeTweetsRepository = new FakeTweetsRepository();

    createTweetService = new CreateTweetService(fakeTweetsRepository);

    fakeRetweetsRepository = new FakeRetweetsRepository();

    countRetweet = new CountRetweetService(
      fakeRetweetsRepository,
      fakeTweetsRepository
    );

    createRetweetService = new CreateRetweetService(
      fakeRetweetsRepository,
      fakeTweetsRepository
    );
  });

  it('should be able to count the retweets', async () => {
    const countLikesSpy = jest.spyOn(fakeRetweetsRepository, 'countRetweets');

    const tweet = await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    await createRetweetService.execute({
      tweet_id: tweet.id,
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    const countLikes = await countRetweet.execute({
      tweet_id: tweet.id,
    });

    expect(countLikes).toBe(1);
    expect(countLikesSpy).toHaveBeenCalledWith(tweet.id);
  });

  it('should not be able to count the retweets of a unexistent tweet', async () => {
    await expect(
      countRetweet.execute({
        tweet_id: 'non-existing tweet',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
