import express from 'express';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello, this is backend');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});