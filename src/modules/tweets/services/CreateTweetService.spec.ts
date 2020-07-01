import AppError from '@shared/errors/AppError';
import FakeTweetsRepository from '../repositories/fakes/FakeTweetsRepository';
import CreateTweetService from './CreateTweetService';

let createTweetService: CreateTweetService;
let fakeTweetsRepository: FakeTweetsRepository;

describe('CreateTweet', () => {
  beforeEach(() => {
    fakeTweetsRepository = new FakeTweetsRepository();

    createTweetService = new CreateTweetService(fakeTweetsRepository);
  });

  it('should be able to create a new tweet', async () => {
    const tweet = await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    expect(tweet).toHaveProperty('id');
  });

  it('should not be able to create a tweet with the same content', async () => {
    await createTweetService.execute({
      content: 'Hi, my name is John Doe',
      user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
    });

    await expect(
      createTweetService.execute({
        content: 'Hi, my name is John Doe',
        user_id: '18f4ac8b-82d9-4f15-a187-86efce8b7269',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
