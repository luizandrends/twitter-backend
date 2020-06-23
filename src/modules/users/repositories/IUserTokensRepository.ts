import UserToken from '../infra/typeorm/entities/UserToken';
import TokenBlacklist from '../infra/typeorm/entities/TokenBlacklist';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
  storeTokenOnBlacklist(token: string): Promise<void>;
  findTokenOnBlacklist(token_id: string): Promise<TokenBlacklist | undefined>;
}
