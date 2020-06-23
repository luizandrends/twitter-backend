import { uuid } from 'uuidv4';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

class UserRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const findUsername = this.users.find(user => user.username === username);

    return findUsername;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  public async delete(user_id: string): Promise<void> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user_id);

    this.users[findIndex].deleted_at = new Date();
  }
}

export default UserRepository;
