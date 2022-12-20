import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

export const createUserFactory = () => {
  const usersRepository = new UsersRepository();
  const createUser = new CreateUserUseCase(usersRepository);
  const createUserController = new CreateUserController(createUser);
  return createUserController;
};
