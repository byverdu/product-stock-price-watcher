import { Product } from '@types-product-stock-price-watcher';

const priceProduct: Product = {
  id: '12',
  brand: 'LG',
  url: 'string',
  type: 'price',
  cssSelector: 'string',
  price: 234,
};
const stockProduct: Product = {
  id: '34',
  brand: 'LG',
  url: 'string',
  type: 'stock',
  cssSelector: 'string',
  price: 234,
};

const productsResponse: Product[] = [priceProduct, stockProduct];

export { productsResponse, priceProduct, stockProduct };
