import { Product } from '@types-product-stock-price-watcher';
import fs from 'fs';
import * as service from './';

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

describe('fileManager service', () => {
  describe('writeFileAsync', () => {
    it('should be defined', () => {
      expect(service.writeFileAsync).toBeInstanceOf(Function);
    });

    it('should call fs.promises.writeFile', async () => {
      jest.spyOn(fs.promises, 'writeFile');

      await service.writeFileAsync([{} as Product], '/src');

      expect(fs.promises.writeFile).toBeCalledTimes(1);
      expect(fs.promises.writeFile).toBeCalledWith('/src', '[{}]', {
        encoding: 'utf-8',
      });
    });

    it('should save data successfully', async () => {
      jest.spyOn(fs.promises, 'writeFile').mockResolvedValue(undefined);

      await expect(
        service.writeFileAsync([{} as Product], '/src')
      ).resolves.toEqual('Data saved');
    });

    it('should handle fs.promises.writeFile errors', async () => {
      jest
        .spyOn(fs.promises, 'writeFile')
        .mockRejectedValue(new Error('Something went wrong'));

      await expect(
        service.writeFileAsync([{} as Product], '/src')
      ).rejects.toThrowError('Something went wrong');
    });
  });

  describe('readFileAsync', () => {
    it('should be defined', () => {
      expect(service.readFileAsync).toBeInstanceOf(Function);
    });

    it('should call fs.promises.readFile', async () => {
      jest.spyOn(fs.promises, 'readFile');

      await service.readFileAsync('/src');

      expect(fs.promises.readFile).toBeCalledTimes(1);
      expect(fs.promises.readFile).toBeCalledWith('/src', {
        encoding: 'utf-8',
      });
    });

    it('should read and parse data successfully', async () => {
      jest
        .spyOn(fs.promises, 'readFile')
        .mockResolvedValue(Promise.resolve('[1, 2]'));

      await expect(service.readFileAsync('/src')).resolves.toEqual([1, 2]);
    });

    it('should return null if data is not a Buffer', async () => {
      jest
        .spyOn(fs.promises, 'readFile')
        .mockResolvedValue(Promise.resolve(false as unknown as string));

      await expect(service.readFileAsync('/src')).resolves.toEqual(null);
    });

    it('should handle fs.promises.readFile errors', async () => {
      jest
        .spyOn(fs.promises, 'readFile')
        .mockRejectedValue(new Error('Something went wrong'));

      await expect(service.readFileAsync('/src')).rejects.toThrowError(
        'Something went wrong'
      );
    });
  });
});
