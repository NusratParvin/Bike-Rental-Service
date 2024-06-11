import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  // const a = 2
  // res.send(a)

  res.send('Welcome to Bike Rental Service!');
});

export default app;
