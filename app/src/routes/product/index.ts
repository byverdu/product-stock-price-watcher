import { Router } from 'express';
import { postProductsHandler, deleteProductsHandler } from './handlers';

const productRouter = Router();

productRouter.post('/', postProductsHandler);
productRouter.delete('/id/:id', deleteProductsHandler);

export { productRouter };
