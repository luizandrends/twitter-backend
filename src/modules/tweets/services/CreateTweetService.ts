import { injectable, inject } from 'tsyringe';

interface IRequest {
  content: string;
}

@injectable()
class CreateTweetService {
  constructor() {}

  public async execute({ content }: IRequest): Promise<Tweet> {}
}

export default CreateTweetService;
