import { readFileAsync, writeFileAsync } from '@services/fileManager/index';
import config from '@config';
import { Request, Response } from 'express';
import { Product } from '@types-product-stock-price-watcher';
import { randomUUID } from 'crypto';

export const isProduct = (aProduct: unknown): aProduct is Product => {
  return (
    typeof aProduct === 'object' &&
    ((aProduct as Product).type === 'price' ||
      (aProduct as Product).type === 'stock') &&
    typeof (aProduct as Product).brand === 'string' &&
    typeof (aProduct as Product).cssSelector === 'string' &&
    typeof (aProduct as Product).brand === 'string' &&
    typeof (aProduct as Product).price === 'number' &&
    typeof (aProduct as Product).url === 'string'
  );
};

export const getMissingProductKeys = (product: Product) => {
  const mandatoryKeys: (keyof Product)[] = [
    'brand',
    'cssSelector',
    'price',
    'type',
    'url',
  ];

  return mandatoryKeys
    .map(key => {
      if (!product[key]) {
        return key;
      }

      return null;
    })
    .filter(Boolean)
    .join('~');
};

const postProductsHandler = async (req: Request, res: Response) => {
  const newProduct = req.body as unknown as Product;

  if (!isProduct(newProduct)) {
    const missingKeys = getMissingProductKeys(newProduct as Product);

    res.status(200);
    res.send(`Mandatory fields are missing: ${missingKeys}`);

    return;
  }

  try {
    const data = (await readFileAsync(config.dataPath)) ?? [];
    const newItems: Product[] = [...data, { ...newProduct, id: randomUUID() }];
    const fileWritten = await writeFileAsync(config.dataPath, newItems);

    if (fileWritten) {
      res.status(200);
      res.send(true);
    } else {
      res.status(200);
      res.send(false);
    }
  } catch (error) {
    res.status(500);
    res.send(String(error));
  }
};

const deleteProductsHandler = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const productId = req.params.id;

  try {
    const data = (await readFileAsync(config.dataPath)) ?? [];
    const newItems: Product[] = data.filter(
      product => product.id !== productId
    );
    const fileWritten = await writeFileAsync(config.dataPath, newItems);

    if (fileWritten) {
      res.status(200);
      res.send(true);
    } else {
      res.status(200);
      res.send(false);
    }
  } catch (error) {
    res.status(500);
    res.send(String(error));
  }
};

export { postProductsHandler, deleteProductsHandler };
