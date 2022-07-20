import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import products from './data/products';
import connectDB from './config/db';
import cors from 'cors';

dotenv.config();

connectDB();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is running!');
});

app.get('/api/products', (req: Request, res: Response) => {
  res.json(products);
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find(p => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
