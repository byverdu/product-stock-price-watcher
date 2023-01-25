import { Router } from 'express';
import { postProductsHandler } from './handlers';

const productRouter = Router();

productRouter.post('/', postProductsHandler);
productRouter.delete('/id/:id');

export { productRouter };
