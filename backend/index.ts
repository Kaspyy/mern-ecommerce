import express, { Express, Request, Response } from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
import productRoutes from './routes/productRoutes';

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running!');
});

app.use('/api/products', productRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
