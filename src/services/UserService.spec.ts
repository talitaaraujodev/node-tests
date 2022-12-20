import { User } from '../entities/User';
import { UsersRepositoryInMemory } from '../repositories/inMemory/UsersRepositoryInMemory';
import { UsersRepository } from '../repositories/UsersRepository';
import { UserService } from './UserService';

describe('Create user', () => {
  let usersRepository: UsersRepository;
  let userService: UserService;

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory();
    userService = new UserService(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const userData: User = {
      name: 'Test Name',
      email: 'test@test.com',
      username: 'testusername',
    };

    const user = await userService.create(userData);

    expect(user).toHaveProperty('id');
    expect(user.email).toEqual('test@test.com');
  });

  it('should not be able to create an existing user', async () => {
    const userData: User = {
      name: 'Test Existing Name',
      email: 'testexisting@test.com',
      username: 'testexistingusername',
    };

    await userService.create(userData);

    await expect(userService.create(userData)).rejects.toEqual(
       new Error()
    );
  });
});
