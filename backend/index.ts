import path from 'path';
import express, { Express, Request, Response } from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
import morgan from 'morgan';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import uploadRoutes from './routes/uploadRoutes';

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT;

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running!');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req: Request, res: Response) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const uploadsFolder = path.join(__dirname, 'uploads');
console.log(uploadsFolder);
app.use('/uploads', express.static(uploadsFolder));
app.use(notFound);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
