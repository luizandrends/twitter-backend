import AppError from '@shared/errors/AppError';
import FakeTweetsRepository from '../repositories/fakes/FakeTweetsRepository';
import CreateTweetService from './CreateTweetService';
import FakeRetweetsRepository from '../repositories/fakes/FakeRetweetsRepository';
import DeleteRetweetService from './DeleteRetweetService';
import CreateRetweetService from './CreateRetweetService';

let createTweetService: CreateTweetService;
let fakeTweetsRepository: FakeTweetsRepository;

let fakeRetweetsRepository: FakeRetweetsRepository;
let deleteRetweetService: DeleteRetweetService;

let createRetweetService: CreateRetweetService;

describe('DeleteRetweet', () => {
  beforeEach(() => {
    fakeTweetsRepository = new FakeTweetsRepository();

    createTweetService = new CreateTweetService(fakeTweetsRepository);

    fakeRetweetsRepository = new FakeRetweetsRepository();

    deleteRetweetService = new DeleteRetweetService(fakeRetweetsRepository);

    createRetweetService = new CreateRetweetService(
      fakeRetweetsRepository,
      fakeTweetsRepository
    );
  });
  it('should be able to delete a retweet', async () => {
    const tweet = await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    const retweet = await createRetweetService.execute({
      tweet_id: tweet.id,
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    await deleteRetweetService.execute({
      retweet_id: retweet.retweet.id,
    });

    expect(retweet.retweet.deleted_at).toBe(retweet.retweet.deleted_at);
  });

  it('should not be able to unlike an unexistent like', async () => {
    await expect(
      deleteRetweetService.execute({
        retweet_id: 'retweet-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
