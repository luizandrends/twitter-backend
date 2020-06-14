import IUsersRepository from '../IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import User from '@modules/users/infra/typeorm/entities/User'

class UserRepository implements IUsersRepository{
  public async findById(id: string): Promise<User | undefined> {

  }

  public async findByEmail(email: string): Promise<User | undefined> {

  }

  public async findByUsername(username: string): Promise<User | undefined> {

  }

  public async create(userData: ICreateUserDTO): Promise<User> {

  }

  public async save(user: User): Promise<User> {

  }
}

export default UserRepository;
