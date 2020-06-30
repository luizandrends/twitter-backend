import AppError from '@shared/errors/AppError';
import FakeTweetRepository from '../repositories/fakes/FakeTweetRepository';
import CreateTweetService from './CreateTweetService';

let createTweetService: CreateTweetService;
let fakeTweetRepository: FakeTweetRepository;

describe('CreateTweet', () => {
  beforeEach(() => {
    fakeTweetRepository = new FakeTweetRepository();

    createTweetService = new CreateTweetService(fakeTweetRepository);
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
