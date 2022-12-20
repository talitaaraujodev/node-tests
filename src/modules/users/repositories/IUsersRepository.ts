import { User } from '../entities/User';

export interface IUsersRepository {
  create(user: User): Promise<User>;
  findByEmail(username: string): Promise<boolean>;
}
