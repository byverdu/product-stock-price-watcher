/* eslint-disable @typescript-eslint/unbound-method */
import { Request, Response } from 'express';
import * as handlers from './handlers';
import * as fileManager from '@services/fileManager';
import {
  productsResponse,
  priceProduct,
  stockProduct,
} from '@routes/__mocks__/index';
import { WatchType } from '@types-product-stock-price-watcher';

jest.mock('../../services/fileManager');

const mockResponse = (data?: Record<string, unknown>) => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(data);
  res.send = jest.fn().mockReturnValue(data);

  return res;
};

const getProductsRequest = {} as unknown as Request;
const response = mockResponse();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('getProductsHandler', () => {
  it('should be defined', () => {
    expect(handlers.getProductsHandler).toBeInstanceOf(Function);
  });

  it('should call fileManager.readFileAsync', async () => {
    jest.spyOn(fileManager, 'readFileAsync');

    await handlers.getProductsHandler(getProductsRequest, response);

    expect(fileManager.readFileAsync).toBeCalledTimes(1);
    expect(fileManager.readFileAsync).lastCalledWith('src/data/index.json');
  });

  it('should return products from fileManager.readFileAsync', async () => {
    jest
      .spyOn(fileManager, 'readFileAsync')
      .mockResolvedValue(productsResponse);

    await handlers.getProductsHandler(getProductsRequest, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(productsResponse);
  });

  it('should return "No data found" if empty response from fileManager.readFileAsync', async () => {
    jest.spyOn(fileManager, 'readFileAsync');

    await handlers.getProductsHandler(getProductsRequest, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledWith('No data found');
  });

  it('should catch Errors from fileManager.readFileAsync', async () => {
    jest.spyOn(fileManager, 'readFileAsync').mockRejectedValue('some error');

    await handlers.getProductsHandler(getProductsRequest, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.send).toHaveBeenCalledWith('some error');
  });
});

describe('getProductsByTypeHandler', () => {
  it('should be defined', () => {
    expect(handlers.getProductsByTypeHandler).toBeInstanceOf(Function);
  });

  it('should check if params has "type" prop', async () => {
    const request = { params: {} } as unknown as Request<{
      type: WatchType;
    }>;
    await handlers.getProductsByTypeHandler(request, response);

    expect(response.send).toHaveBeenCalledWith('Wrong type params used.');
  });

  it('should check if "type" params has a correct value', async () => {
    const request = {
      params: { types: 'byverdu' },
    } as unknown as Request<{
      type: WatchType;
    }>;
    await handlers.getProductsByTypeHandler(request, response);

    expect(response.send).toHaveBeenCalledWith('Wrong type params used.');
  });

  it('should call fileManager.readFileAsync', async () => {
    jest.spyOn(fileManager, 'readFileAsync');

    const request = {
      params: { type: 'price' },
    } as unknown as Request<{
      type: WatchType;
    }>;

    await handlers.getProductsByTypeHandler(request, response);

    expect(fileManager.readFileAsync).toBeCalledTimes(1);
    expect(fileManager.readFileAsync).lastCalledWith('src/data/index.json');
  });

  it('should return products filtered by price', async () => {
    jest
      .spyOn(fileManager, 'readFileAsync')
      .mockResolvedValue(productsResponse);

    const request = {
      params: { type: 'price' },
    } as unknown as Request<{
      type: WatchType;
    }>;

    await handlers.getProductsByTypeHandler(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith([priceProduct]);
  });

  it('should return products filtered by stock', async () => {
    jest
      .spyOn(fileManager, 'readFileAsync')
      .mockResolvedValue(productsResponse);

    const request = {
      params: { type: 'stock' },
    } as unknown as Request<{
      type: WatchType;
    }>;

    await handlers.getProductsByTypeHandler(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith([stockProduct]);
  });

  it('should return "No data found" if empty response from fileManager.readFileAsync', async () => {
    jest.spyOn(fileManager, 'readFileAsync');

    const request = {
      params: { type: 'stock' },
    } as unknown as Request<{
      type: WatchType;
    }>;

    await handlers.getProductsByTypeHandler(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.send).toHaveBeenCalledWith('No data found');
  });

  it('should catch Errors from fileManager.readFileAsync', async () => {
    jest.spyOn(fileManager, 'readFileAsync').mockRejectedValue('some error');

    const request = {
      params: { type: 'stock' },
    } as unknown as Request<{
      type: WatchType;
    }>;

    await handlers.getProductsByTypeHandler(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.send).toHaveBeenCalledWith('some error');
  });
});
