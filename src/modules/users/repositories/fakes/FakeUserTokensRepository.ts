import { uuid } from 'uuidv4';

import UserToken from '../../infra/typeorm/entities/UserToken';
import TokenBlacklist from '../../infra/typeorm/entities/TokenBlacklist';
import IUsersTokenRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUsersTokenRepository {
  private userTokens: UserToken[] = [];

  private blacklist: TokenBlacklist[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token
    );

    return userToken;
  }

  public async storeTokenOnBlacklist(token_id: string): Promise<void> {
    const blacklist = new TokenBlacklist();

    Object.assign(blacklist, {
      id: uuid(),
      token_id,
      created_at: new Date(),
    });

    this.blacklist.push(blacklist);
  }
}

export default FakeUserTokensRepository;
