import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';
import { BadRequestError } from '../utils/errors/BadRequestError';
import UserYupValidator  from '../validators/UserYupValidator';

interface CreateUserDto {
  name: string;
  username: string;
  email: string;
}

export class UserService {
  constructor(private usersRepository: UsersRepository) {}

  async create(data: CreateUserDto) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.username);
    const validation = await UserYupValidator.validate(data);
   
    if (userAlreadyExists) {
      throw new BadRequestError("Usuário já é existente");
    }
    if(validation){
      throw new BadRequestError(validation.errors)
   }
    const userCreate = User.create(data);

    const user = await this.usersRepository.create(userCreate);

    return user;
  }
}
