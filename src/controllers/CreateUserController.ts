import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private userService: UserService) {}

  async create(request: Request, response: Response) {
    const user = await this.userService.create(request.body);

    return response.status(201).json(user);
  }
}
