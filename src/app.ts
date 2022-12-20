import express from 'express';
import cors from "cors";
import 'express-async-errors';
import 'dotenv/config';
import { usersRoutes } from './routes/usersRoute';
class App {
    private express: express.Application;
    public constructor() {
      this.express = express();
      this.middlewares();
    }
    private middlewares(): void {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(usersRoutes);
      }
    
      public getApp() {
        return this.express;
      }
}
export default new App().getApp();