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
    });

    expect(tweet).toHaveProperty('id');
  });

  it('should not be able to create a tweet with the same content', async () => {
    await createTweetService.execute({
      content: 'Hi, my name is John Doe',
    });

    await expect(
      createTweetService.execute({
        content: 'Hi, my name is John Doe',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
