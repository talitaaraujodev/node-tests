import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { email, username, name } = request.body;
    const user = await this.createUser.execute({ email, username, name });

    return response.status(201).json(user);
  }
}
