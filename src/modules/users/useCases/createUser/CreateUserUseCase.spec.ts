import { User } from '../../entities/User';

import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('Create user', () => {
  let usersRepository: IUsersRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeAll(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const userData: User = {
      name: 'Test Name',
      email: 'test@test.com',
      username: 'testusername',
    };

    const user = await createUserUseCase.execute(userData);

    expect(user).toHaveProperty('id');
    expect(user.email).toEqual('test@test.com');
  });

  it('should not be able to create an existing user', async () => {
    const userData: User = {
      name: 'Test Existing Name',
      email: 'testexisting@test.com',
      username: 'testexistingusername',
    };

    await createUserUseCase.execute(userData);

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
       new Error()
    );
  });
});
