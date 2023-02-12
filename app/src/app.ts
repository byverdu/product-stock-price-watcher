import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import { healthRouter } from '@routes/health';
import { productsRouter } from '@routes/products';
import { productRouter } from '@routes/product';

dotenv.config();

const expressApp = () => {
  const app: Express = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json());

  app.use('/health', healthRouter);
  app.use('/products', productsRouter);
  app.use('/product', productRouter);

  app.use((req, res) => {
    res.status(404).send(`No handler found for ${req.url}`);
  });

  return app;
};

export { expressApp };
