import { prisma } from '../../../../database/prisma';

import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  async findByEmail(username: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return !!user;
  }

  async create({ username, email, name }: User): Promise<User> {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        name,
      },
    });

    return user;
  }
}
