import { UserServiceImp } from '../../src/services/implementations/UserServiceImp';
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
      name: 'any_name',
      username: 'any_username',
      email: 'any_email@email.com',
    };
    
    mockUsersRepository.findByEmail = jest.fn(() => Promise.resolve(false));
    mockUsersRepository.create = jest.fn((user) => Promise.resolve(user));
    userService = new UserServiceImp(mockUsersRepository);
  
    expect(async () => { await userService.create(userData)}).not.toThrow(BadRequestError);
})

  it('create_whenPassUserInvalid_returnBadRequest', async () => {
    const userData: User = {
      name: '',
      username: 'any_username',   
      email: 'any_email@email.com',
    };

    mockUsersRepository.findByEmail = jest.fn(() => Promise.resolve(false));
    userService = new UserServiceImp(mockUsersRepository);

    await expect(userService.create(userData)).rejects.toBeInstanceOf(BadRequestError);
  });
  it('create_whenPassEmailExistent_returnBadRequestError', async () => {
    const userData: User = {
      name: 'any_name',
      username: 'any_username',
      email: 'any_email_existent@email.com',
    };

    mockUsersRepository.findByEmail = jest.fn(() => Promise.resolve(true));
    userService = new UserServiceImp(mockUsersRepository);

    await expect(userService.create(userData)).rejects.toBeInstanceOf(BadRequestError);
  });  
  it('create_whenPassUsernameExistent_returnBadRequestError', async () => {
    const userData: User = {
      name: 'any_name',
      username: 'any_username_existent',
      email: 'any_email@email.com',
    };

    mockUsersRepository.findByUsername = jest.fn(() => Promise.resolve(true));
    userService = new UserServiceImp(mockUsersRepository);

    await expect(userService.create(userData)).rejects.toBeInstanceOf(BadRequestError);
  });  

});
