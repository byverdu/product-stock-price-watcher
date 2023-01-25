/* eslint-disable @typescript-eslint/unbound-method */
import { Response, Request } from 'express';
import { Product } from '@types-product-stock-price-watcher';
import * as handlers from './handlers';
import * as fileManager from '@services/fileManager';
import { priceProduct } from '@routes/__mocks__/index';

jest.mock('../../services/fileManager');

const mockResponse = (data?: Record<string, unknown>) => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(data);
  res.send = jest.fn().mockReturnValue(data);

  return res;
};

const response = mockResponse();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Product handlers', () => {
  describe('isProduct', () => {
    it('should be defined', () => {
      expect(handlers.isProduct).toBeInstanceOf(Function);
    });

    it('should return true if object params is a Product', () => {
      expect(
        handlers.isProduct({
          brand: 'LG',
          type: 'price',
          cssSelector: '.some',
          price: 900,
          url: 'some_url ',
        })
      ).toBeTruthy();
    });

    it('should return false if object params is not a Product', () => {
      expect(
        handlers.isProduct({
          type: 'price',
          cssSelector: '.some',
          price: 900,
          url: 'some_url ',
        })
      ).toBeFalsy();
    });

    it('should return false if no object is passed as params', () => {
      expect(handlers.isProduct(undefined)).toBeFalsy();
    });
  });

  describe('getMissingProductKeys', () => {
    it('should be defined', () => {
      expect(handlers.getMissingProductKeys).toBeInstanceOf(Function);
    });

    it('should return missing keys from a Product', () => {
      expect(
        handlers.getMissingProductKeys({
          cssSelector: '.some',
          price: 900,
          url: 'some_url ',
        } as Product)
      ).toEqual('brand~type');
    });

    it('should return empty String if no missing keys from a Product', () => {
      expect(
        handlers.getMissingProductKeys({
          brand: 'LG',
          type: 'price',
          cssSelector: '.some',
          price: 900,
          url: 'some_url ',
        } as Product)
      ).toEqual('');
    });
  });

  describe('postProductsHandler', () => {
    const request = {
      body: {
        brand: 'LG',
        type: 'price',
        cssSelector: '.some',
        price: 900,
        url: 'some_url ',
      },
    } as unknown as Request;

    it('should be defined', () => {
      expect(handlers.postProductsHandler).toBeInstanceOf(Function);
    });

    it('should call handlers.isProduct and handlers.getMissingProductKeys if req.body has missing props', async () => {
      jest.spyOn(handlers, 'getMissingProductKeys').mockReturnValue('');
      jest.spyOn(handlers, 'isProduct').mockReturnValue(false);

      await handlers.postProductsHandler(
        {
          body: { url: 'some-url' },
        } as unknown as Request,
        response
      );

      expect(handlers.isProduct).toBeCalledTimes(1);
      expect(handlers.isProduct).lastCalledWith({ url: 'some-url' });

      expect(handlers.getMissingProductKeys).toBeCalledTimes(1);
      expect(handlers.getMissingProductKeys).lastCalledWith({
        url: 'some-url',
      });
    });

    it('should call fileManager.readFileAsync and fileManager.writeFileAsync if req.body has the correct props', async () => {
      jest.spyOn(handlers, 'isProduct').mockReturnValue(true);
      jest
        .spyOn(fileManager, 'readFileAsync')
        .mockResolvedValue([priceProduct]);
      jest.spyOn(fileManager, 'writeFileAsync').mockResolvedValue(true);

      await handlers.postProductsHandler(request, response);

      expect(fileManager.readFileAsync).toBeCalledTimes(1);

      expect(fileManager.writeFileAsync).toBeCalledTimes(1);
      expect(fileManager.writeFileAsync).lastCalledWith('src/data/index.json', [
        priceProduct,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        { ...request.body, id: expect.any(String) },
      ]);
    });

    it('should return true if the file is written successfully', async () => {
      jest.spyOn(handlers, 'isProduct').mockReturnValue(true);
      jest.spyOn(fileManager, 'writeFileAsync').mockResolvedValue(true);

      await handlers.postProductsHandler(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith(true);
    });

    it('should return false if no data is written', async () => {
      jest.spyOn(handlers, 'isProduct').mockReturnValue(true);
      jest.spyOn(fileManager, 'writeFileAsync').mockResolvedValue(false);

      await handlers.postProductsHandler(request, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.send).toHaveBeenCalledWith(false);
    });

    it('should return false if no data is written', async () => {
      jest.spyOn(handlers, 'isProduct').mockReturnValue(true);
      jest.spyOn(fileManager, 'writeFileAsync').mockRejectedValue('Some Error');

      await handlers.postProductsHandler(request, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.send).toHaveBeenCalledWith('Some Error');
    });
  });
});
