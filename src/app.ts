import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/', router);
app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  // const a = 2
  // res.send(a)

  res.send('Welcome to Bike Rental Service!');
});

export default app;
