import { UsersRepositoryImp } from '../repositories/implementations/UsersRepositoryImp';
import { UserController } from '../controllers/CreateUserController';
import { UserService } from '../services/UserService';

export const userFactory = () => {
  const usersRepository = new UsersRepositoryImp();
  const userService = new UserService(usersRepository);
  const userController = new UserController(userService);
  return userController;
};
