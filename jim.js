import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();
dotenv.config();
const { PORT} = process.env;


app.use(morgan('common'));
app.use(helmet());

app.get('/data', (req, res) => {
  res.status(200).send('From my express server!');
});

app.listen(PORT, ()=> {
  console.log(`✔️ Server running on Port: ${PORT}`);
});