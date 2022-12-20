import { User } from '../entities/User';

export interface UsersRepository {
  create(user: User): Promise<User>;
  findByEmail(username: string): Promise<boolean>;
}
