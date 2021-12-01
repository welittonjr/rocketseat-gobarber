import express from 'express';
import * as dotenv from "dotenv";
import { Cors } from './src/middleware/cors';
import routes from './src/routes';
import './src/database';

if (process.env.NODE_ENV == "dev")
    dotenv.config();

const app = express();

app.use(express.json());
app.use(Cors)
app.use(routes);

app.listen(3000, () => {
  console.log(' Server started on port 3000!');
});