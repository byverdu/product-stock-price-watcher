import { HttpClient } from '@types-product-stock-price-watcher';

const get: HttpClient['get'] = async ({ url }) => await fetch(url);

const post: HttpClient['post'] = async ({ url, params }) =>
  await fetch(url, { method: 'POST', ...params });

export { get, post };
