import { getRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import TokenBlacklist from '@modules/users/infra/typeorm/entities/TokenBlacklist';

class UserTokensRepository implements IUserTokensRepository {
  private ormUserTokenRepository: Repository<UserToken>;

  private ormTokenBlacklistRepository: Repository<TokenBlacklist>;

  constructor() {
    this.ormUserTokenRepository = getRepository(UserToken);
    this.ormTokenBlacklistRepository = getRepository(TokenBlacklist);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormUserTokenRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormUserTokenRepository.create({
      user_id,
      token: uuid(),
    });

    this.ormUserTokenRepository.save(userToken);

    return userToken;
  }

  public async storeTokenOnBlacklist(token_id: string): Promise<void> {
    const token = this.ormTokenBlacklistRepository.create({
      token_id,
    });

    await this.ormTokenBlacklistRepository.save(token);
  }

  public async findTokenOnBlacklist(
    token_id: string
  ): Promise<TokenBlacklist | undefined> {
    const blacklistToken = await this.ormTokenBlacklistRepository.findOne({
      where: { token_id },
    });

    return blacklistToken;
  }
}

export default UserTokensRepository;
