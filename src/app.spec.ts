import request from 'supertest';
import { expressApp } from '@app';
import * as fileManager from '@services/fileManager';
import { productsResponse, priceProduct } from '@routes/__mocks__/index';

jest.mock('./services/fileManager');

let app: Express.Application;

beforeEach(() => {
  app = expressApp();
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

  it('should have a /products route', async () => {
    jest
      .spyOn(fileManager, 'readFileAsync')
      .mockResolvedValue(productsResponse);

    const resp = await request(app).get('/products');

    expect(resp.ok).toEqual(true);
    expect(resp.type).toEqual('application/json');
    expect(resp.body).toEqual(productsResponse);
  });

  it('should have a /products/type/:type route', async () => {
    jest
      .spyOn(fileManager, 'readFileAsync')
      .mockResolvedValue(productsResponse);

    const resp = await request(app).get('/products/type/price');

    expect(resp.ok).toEqual(true);
    expect(resp.type).toEqual('application/json');
    expect(resp.body).toEqual([priceProduct]);
  });

  it('should handle 404 requests', async () => {
    const resp = await request(app).get('/notFound');

    expect(resp.status).toEqual(404);
    expect(resp.type).toEqual('text/html');
    expect(resp.text).toEqual('No handler found for /notFound');
  });
});
