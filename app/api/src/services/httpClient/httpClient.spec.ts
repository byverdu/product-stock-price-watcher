import * as httpClient from './';
import { Response } from 'undici';
import { HttpClient } from '@types-product-stock-price-watcher';

jest.mock('./');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ value: 12 }),
  } as Response)
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('httpClient', () => {
  describe('get method', () => {
    it('should be defined', () => {
      expect(httpClient.get).toBeInstanceOf(Function);
    });
    it('should be called with an url param', async () => {
      jest.spyOn(httpClient, 'get');

      await httpClient.get('http://test.com');

      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).toBeCalledWith('http://test.com');
    });
    it('should call fetch and resolve .json()', async () => {
      const { get }: HttpClient = jest.requireActual('./');

      const request = await get('http://test.com');

      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith('http://test.com');

      const resp = await request.json();

      expect(resp).toEqual({ value: 12 });
    });
  });
  describe('post method', () => {
    it('should be defined', () => {
      expect(httpClient.post).toBeInstanceOf(Function);
    });
    it('should be called with an url param and body', async () => {
      jest.spyOn(httpClient, 'post');

      await httpClient.post({ url: 'http://test.com' });

      expect(httpClient.post).toBeCalledTimes(1);
      expect(httpClient.post).toBeCalledWith({ url: 'http://test.com' });
    });
    it('should call fetch and resolve .json()', async () => {
      const { post }: HttpClient = jest.requireActual('./');

      const request = await post({
        url: 'http://test.com',
        params: { body: JSON.stringify(true) },
      });

      expect(global.fetch).toBeCalledTimes(1);
      expect(global.fetch).toBeCalledWith('http://test.com', {
        method: 'POST',
        body: 'true',
      });

      const resp = await request.json();

      expect(resp).toEqual({ value: 12 });
    });
  });
});
