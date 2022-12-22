import { Router } from 'express';
import { UserFactory }   from '../factories/UserFactory';

const usersRoutes = Router();

usersRoutes.post('/users', (request, response) =>
  UserFactory.compose().create(request, response)
);

export { usersRoutes };
