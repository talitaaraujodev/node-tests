import { User } from '../../src/entities/User';
import { UsersRepository } from '../../src/repositories/UsersRepository';
import { BadRequestError } from '../../src/utils/errors/BadRequestError';
import { UserService } from '../../src/services/UserService';
import  {createMock} from 'ts-auto-mock';

describe('User service', () => {
  let userService: UserService;

  it('create_whenPassUserValid_returnSuccess', async () => {
    const userData: User = {
      name: 'Test name',
      email: 'test@test.com',
      username: 'test username',
    };
    const mockUsersRepository =  createMock<UsersRepository>();
    mockUsersRepository.findByEmail = jest.fn(() => Promise.resolve(false));
    mockUsersRepository.create = jest.fn((user) => Promise.resolve(user));
    userService = new UserService(mockUsersRepository);
  
    expect(async () => { await userService.create(userData)}).not.toThrow(BadRequestError);
})

  it('create_whenPassUserInvalid_returnBadRequest', async () => {
    const userData: User = {
      name: '',
      email: 'test@test.com',
      username: 'test username',
    };

    const mockUsersRepository =  createMock<UsersRepository>();
    mockUsersRepository.findByEmail = jest.fn(() => Promise.resolve(false));
    userService = new UserService(mockUsersRepository);

    await expect(userService.create(userData)).rejects.toBeInstanceOf(BadRequestError);
  });
  it('create_whenPassEmailExistent_returnBadRequestError', async () => {
    const userData: User = {
      name: 'Test Existing Name',
      email: 'testexisting@test.com',
      username: 'testexistingusername',
    };

    const mockUsersRepository =  createMock<UsersRepository>();
    mockUsersRepository.findByEmail = jest.fn(() => Promise.resolve(true));
    userService = new UserService(mockUsersRepository);
    console.log(userService)

    await expect(userService.create(userData)).rejects.toBeInstanceOf(BadRequestError);
  });  

});
