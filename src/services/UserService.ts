import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';
import { BadRequestError } from '../utils/errors/BadRequestError';

interface CreateUserDto {
  name: string;
  username: string;
  email: string;
}

export class UserService {
  constructor(private usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.username);

    if (userAlreadyExists) {
      throw new BadRequestError("Usuário já é existente");
    }

    const userCreate = User.create(data);

    const user = await this.usersRepository.create(userCreate);

    return user;
  }
}
