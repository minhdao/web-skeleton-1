import express from 'express';
import { handleSignUpUser } from './auth/sign-up/sign-up.handler';
import cors from 'cors';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { initPgRepo } from '../db/repo/pg/pg.client';

// Load .env variables
dotenv.config();

const app = express();
const port = 8080;

app.use(cors({ origin: 'http://127.0.0.1:5173' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, this is backend');
});

app.post('/sign-up', handleSignUpUser);

app.listen(port, async () => {
  await initPgRepo();

  console.log(`Server started on port ${port}`);
});
