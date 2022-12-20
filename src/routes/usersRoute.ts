import { Router } from 'express';
import { userFactory } from '../factories/UserFactory';

const usersRoutes = Router();

usersRoutes.post('/users', (request, response) =>
  userFactory().create(request, response)
);

export { usersRoutes };
