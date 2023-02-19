import * as httpClient from '@services/httpClient';
import { Product } from '@types-product-stock-price-watcher';
import { Response } from 'undici';
import * as cheerio from 'cheerio';
import * as service from './';
import * as utils from '@services/utils';

jest.mock('../httpClient');

afterEach(() => {
  jest.clearAllMocks();
  jest.resetModules();
});

const mockResponse = (returnValue: string) =>
  ({
    text: () => Promise.resolve(returnValue),
  } as Response);

const product = {
  url: 'https://www.lg.com/uk/monitors/lg-32gq950-b',
  cssSelector: '.total-price-num strong',
} as Product;

describe('scrapper', () => {
  it('should be defined', () => {
    expect(service.scrapper).toBeInstanceOf(Function);
  });

  it('should call httpClient.get with the product url', async () => {
    jest
      .spyOn(httpClient, 'get')
      .mockReturnValue(Promise.resolve(mockResponse('')));

    await service.scrapper(product);

    expect(httpClient.get).toBeCalledTimes(1);
    expect(httpClient.get).toBeCalledWith(product.url);
  });

  it('should call cheerio.load', async () => {
    jest.mock('cheerio');
    jest
      .spyOn(httpClient, 'get')
      .mockReturnValue(Promise.resolve(mockResponse('<div>Hello</div>')));
    jest.spyOn(cheerio, 'load');

    await service.scrapper(product);

    expect(cheerio.load).toBeCalledTimes(1);
    expect(cheerio.load).toBeCalledWith('<div>Hello</div>');
  });

  it('should call toNumber', async () => {
    jest.mock('../utils');
    jest.spyOn(utils, 'toNumber');
    jest
      .spyOn(httpClient, 'get')
      .mockReturnValue(
        Promise.resolve(
          mockResponse(
            '<div class="total-price-num"><strong>£1,049.98</strong></div>'
          )
        )
      );

    await service.scrapper(product);

    expect(utils.toNumber).toBeCalledTimes(1);
    expect(utils.toNumber).toBeCalledWith('£1,049.98');
  });

  it('should return the number if Cheerio finds the css selector', async () => {
    jest
      .spyOn(httpClient, 'get')
      .mockReturnValue(
        Promise.resolve(
          mockResponse(
            '<div class="total-price-num"><strong>£1,049.98</strong></div>'
          )
        )
      );

    await expect(service.scrapper(product)).resolves.toEqual(1049.98);
  });

  it('should return null if Cheerio can not find the css selector', async () => {
    jest
      .spyOn(httpClient, 'get')
      .mockReturnValue(
        Promise.resolve(
          mockResponse('<div class="total"><strong>£1,049.98</strong></div>')
        )
      );

    await expect(service.scrapper(product)).resolves.toEqual(null);
  });

  it('should throw an Error if the GET request fails', async () => {
    jest.spyOn(httpClient, 'get').mockRejectedValue(new Error('some error'));

    await expect(service.scrapper(product)).rejects.toThrow('some error');
  });
});
