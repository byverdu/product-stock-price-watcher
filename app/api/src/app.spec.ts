import request from 'supertest';
import { expressApp } from '@app';
import * as fileManager from '@services/fileManager';
import * as handlers from '@routes/product/handlers';
import { productsResponse, priceProduct } from '@routes/__mocks__/index';

jest.mock('./services/fileManager');

let app: Express.Application;

beforeEach(() => {
  app = expressApp();
  jest.resetAllMocks();
});

describe('App', () => {
  it('should be defined', () => {
    expect(expressApp).toBeInstanceOf(Function);
  });

  it('should have a /health route', async () => {
    const resp = await request(app).get('/health');

    expect(resp.ok).toEqual(true);
    expect(resp.type).toEqual('text/html');
    expect(resp.text).toEqual('ok');
  });

  it('should have a GET /products route', async () => {
    jest
      .spyOn(fileManager, 'readFileAsync')
      .mockResolvedValue(productsResponse);

    const resp = await request(app).get('/products');

    expect(resp.ok).toEqual(true);
    expect(resp.type).toEqual('application/json');
    expect(resp.body).toEqual(productsResponse);
  });

  it('should have a GET /products/type/:type route', async () => {
    jest
      .spyOn(fileManager, 'readFileAsync')
      .mockResolvedValue(productsResponse);

    const resp = await request(app).get('/products/type/price');

    expect(resp.ok).toEqual(true);
    expect(resp.type).toEqual('application/json');
    expect(resp.body).toEqual([priceProduct]);
  });

  it('should have a POST /product route', async () => {
    jest.spyOn(handlers, 'isProduct').mockReturnValue(true);
    jest.spyOn(fileManager, 'writeFileAsync').mockResolvedValue(true);

    const body = {
      brand: 'LG',
      type: 'price',
      cssSelector: '.some',
      price: 900,
      url: 'some_url ',
    };

    const resp = await request(app).post('/product').send(body);

    expect(resp.ok).toEqual(true);
    expect(resp.type).toEqual('application/json');
    expect(resp.body).toEqual(true);
  });

  it('should have a POST /product route and check if body is a correct product', async () => {
    const body = {
      type: 'price',
      cssSelector: '.some',
      price: 900,
      url: 'some_url ',
    };

    const resp = await request(app).post('/product').send(body);

    expect(resp.ok).toEqual(true);
    expect(resp.type).toEqual('text/html');
    expect(resp.text).toEqual('Mandatory fields are missing: brand');
  });

  it('should have a DELETE /product/id/:id route', async () => {
    jest.spyOn(handlers, 'isProduct').mockReturnValue(true);
    jest.spyOn(fileManager, 'writeFileAsync').mockResolvedValue(true);

    const resp = await request(app).delete('/product/id/34');

    expect(resp.ok).toEqual(true);
    expect(resp.type).toEqual('application/json');
    expect(resp.body).toEqual(true);
  });

  it('should handle 404 requests', async () => {
    const resp = await request(app).get('/notFound');

    expect(resp.status).toEqual(404);
    expect(resp.type).toEqual('text/html');
    expect(resp.text).toEqual('No handler found for /notFound');
  });
});
