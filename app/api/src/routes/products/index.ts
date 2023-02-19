import { Router } from 'express';
import { getProductsHandler, getProductsByTypeHandler } from './handlers';

const productsRouter = Router();

productsRouter.get('/', getProductsHandler);
productsRouter.get('/type/:type', getProductsByTypeHandler);

export { productsRouter };
