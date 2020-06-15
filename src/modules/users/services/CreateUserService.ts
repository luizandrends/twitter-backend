import { injectable, inject } from 'tsyringe'

import User from '../infra/typeorm/entities/User'

import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  name: string,
  email: string,
  username: string,
  password: string,
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ){}

  public async execute({ name, email, username, password }: IRequest): Promise<User> {
    const user = this.usersRepository.create({
      name,
      email,
      username,
      password
    })

    return user
  }
}

export default CreateUserService;
