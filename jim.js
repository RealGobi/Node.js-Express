import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import config from './config/config.js';
import cors from 'cors';

import ItemRoute from './routes/Item-Routes.js'

const app = express();
app.use(express.json());
app.use(cors());

app.use(morgan('common'));
app.use(helmet());

// app.get('/data', (req, res) => {
//   res.status(200).send('From my express server!');
// });

ItemRoute.routes(app);

config.connectToPort(app);
config.connectToDb();

export default app;