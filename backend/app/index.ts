import express from 'express';
import { handleSignUpUser } from './auth/sign-up/sign-up.handler';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, this is backend');
});

app.post('/sign-up', handleSignUpUser);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
