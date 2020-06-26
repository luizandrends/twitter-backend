import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  username: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    username,
    password,
  }: IRequest): Promise<User> {
    const checkEmailExists = await this.usersRepository.findByEmail(email);
    const checkUsernameExists = await this.usersRepository.findByUsername(
      username
    );

    if (checkUsernameExists) {
      throw new AppError('Username or email already exists', 400);
    }

    if (checkEmailExists) {
      throw new AppError('Username or email already exists', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
