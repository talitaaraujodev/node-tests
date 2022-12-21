import { UserServiceImp } from './../../src/services/implementations/UserServiceImp';
import { User } from '../../src/entities/User';
import { UsersRepository } from '../../src/repositories/UsersRepository';
import { BadRequestError } from '../../src/utils/errors/BadRequestError';
import { UserService } from '../../src/services/UserService';
import { createMock } from 'ts-auto-mock';

describe('Create User Service', () => {
  let userService: UserService;
  let mockUsersRepository = createMock<UsersRepository>()

  it('create_whenPassUserValid_returnSuccess', async () => {
    const userData: User = {
      name: 'Test name',
      email: 'test@test.com',
      username: 'test username',
    };
    
    mockUsersRepository.findByEmail = jest.fn(() => Promise.resolve(false));
    mockUsersRepository.create = jest.fn((user) => Promise.resolve(user));
    userService = new UserServiceImp(mockUsersRepository);
  
    expect(async () => { await userService.create(userData)}).not.toThrow(BadRequestError);
})

  it('create_whenPassUserInvalid_returnBadRequest', async () => {
    const userData: User = {
      name: '',
      email: 'test@test.com',
      username: 'test username',
    };

    mockUsersRepository.findByEmail = jest.fn(() => Promise.resolve(false));
    userService = new UserServiceImp(mockUsersRepository);

    await expect(userService.create(userData)).rejects.toBeInstanceOf(BadRequestError);
  });
  it('create_whenPassEmailExistent_returnBadRequestError', async () => {
    const userData: User = {
      name: 'Test',
      email: 'testexisting@test.com',
      username: 'testusername',
    };

    mockUsersRepository.findByEmail = jest.fn(() => Promise.resolve(true));
    userService = new UserServiceImp(mockUsersRepository);

    await expect(userService.create(userData)).rejects.toBeInstanceOf(BadRequestError);
  });  
  it('create_whenPassUsernameExistent_returnBadRequestError', async () => {
    const userData: User = {
      name: 'Test',
      email: 'test@test.com',
      username: 'testexistingusername',
    };

    mockUsersRepository.findByUsername = jest.fn(() => Promise.resolve(true));
    userService = new UserServiceImp(mockUsersRepository);

    await expect(userService.create(userData)).rejects.toBeInstanceOf(BadRequestError);
  });  

});
