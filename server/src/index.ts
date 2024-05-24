import dotenv from 'dotenv';
dotenv.config();


import express from 'express';
import routes from './routes';

import { connect } from './db/database';

const app = express();
const port = 3000;

// add cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());

try{
  app.use("/", routes);
} catch (error) {
  console.log(error);
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  await connect();
  console.log(`Server started at http://localhost:${port}`);
});