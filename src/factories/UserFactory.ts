import { UsersRepositoryImp } from '../repositories/implementations/UsersRepositoryImp';
import { UserController } from '../controllers/CreateUserController';
import { UserServiceImp } from '../services/implementations/UserServiceImp';

export const userFactory = () => {
  const usersRepository = new UsersRepositoryImp();
  const userService = new UserServiceImp(usersRepository);
  const userController = new UserController(userService);
  return userController;
};
