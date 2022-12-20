import express from 'express';
import 'express-async-errors';
import 'dotenv/config';
import { routes } from './routes';

const app = express();

app.use(express.json());

app.use(routes);


export { app };
