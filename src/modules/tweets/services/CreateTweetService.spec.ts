import FakeTweetRepository from '../repositories/fakes/FakeTweetRepository';
import CreateTweetService from './CreateTweetService';

let createTweetService: CreateTweetService;
let fakeTweetRepository: FakeTweetRepository;

describe('CreateTweet', () => {
  beforeEach(() => {
    fakeTweetRepository = new FakeTweetRepository();

    createTweetService = new CreateTweetService(fakeTweetRepository);
  });

  it('should be able to create a new user', async () => {
    const tweet = await createTweetService.execute({
      content: 'Hi, my name is John Doe',
    });

    expect(tweet).toHaveProperty('id');
  });
});
