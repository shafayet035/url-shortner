import express from 'express';
import { config } from 'dotenv';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import { readdirSync } from 'fs';
import cors from 'cors';

config({ path: path.resolve(__dirname, '../.env') });

export const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

/*
Initialize Databse
@returns {Object} db
*/

const routresDir = path.join(__dirname, 'routes');

readdirSync(routresDir).map((route) => {
  const subRoute = path.parse(route).name;
  app.use(`/api/${subRoute}`, require(`${routresDir}/${route}`));
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
