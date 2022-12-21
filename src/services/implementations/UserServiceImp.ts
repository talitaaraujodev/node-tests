import { User } from '../../entities/User';
import { BadRequestError } from '../../utils/errors/BadRequestError';
import UserYupValidator from '../../validators/UserYupValidator';
import { CreateUserDto, UserService } from '../UserService';
import { UsersRepository } from './../../repositories/UsersRepository';


export class UserServiceImp implements UserService {
    constructor(private usersRepository: UsersRepository) {}

  async create(data: CreateUserDto): Promise<User> {
    const usernameAlreadyExists = await this.usersRepository.findByUsername(data.username);
    const emailAlreadyExists = await this.usersRepository.findByEmail(data.email);
    const validation = await UserYupValidator.validate(data);
   
    if (usernameAlreadyExists) {
      throw new BadRequestError("Usuário já é existente por username");
    }
    if(emailAlreadyExists) {
      throw new BadRequestError("Usuário já é existente por e-mail");
    }
    if (validation) {
      throw new BadRequestError(validation.errors)
   }
    const userCreate = User.create(data);

    const user = await this.usersRepository.create(userCreate);

    return user;
  }
}