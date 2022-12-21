import { User } from '../entities/User';

export interface UsersRepository {
  create(user: User): Promise<User>;
  findByUsername(username: string): Promise<boolean>;
  findByEmail(email: string): Promise<boolean>;
}
