import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { initConnection } from './db/connection';
import pubRouter from './routes/publisher';
import userRouter from './routes/user';
const app = express();
/**
 * Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
const connection = initConnection();
connection.once('open', () => {
  console.log(`Yes the DB loaded sucessfully`);
});
/**
 * Routes
 */
app.get('/', (req, res) => res.send('App is working').end());
app.use('/api/pub', pubRouter);
app.use('/api/sub', userRouter);

app.listen(4000, () => {
  console.log(`App is listening at 4000`);
});
