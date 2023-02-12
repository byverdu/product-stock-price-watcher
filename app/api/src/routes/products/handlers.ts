import { readFileAsync } from '@services/fileManager/index';
import config from '@config';
import { Request, Response } from 'express';
import { WatchType } from '@types-product-stock-price-watcher';

const getProductsHandler = async (_: Request, res: Response) => {
  try {
    const data = await readFileAsync(config.dataPath);

    if (data) {
      res.status(200);
      res.json(data);
    } else {
      res.status(200);
      res.send('No data found');
    }
  } catch (error) {
    res.status(500);
    res.send(String(error));
  }
};

const getProductsByTypeHandler = async (
  req: Request<{ type: WatchType }>,
  res: Response
) => {
  const type = req.params.type;
  const validParams: WatchType[] = ['price', 'stock'];

  if (!validParams.includes(type)) {
    res.send('Wrong type params used.');

    return;
  }

  try {
    const data = await readFileAsync(config.dataPath);

    if (data) {
      const dataByType = data.filter(prod => prod.type === type);

      res.status(200);
      res.json(dataByType);
    } else {
      res.status(200);
      res.send('No data found');
    }
  } catch (error) {
    res.status(500);

    res.send(String(error));
  }
};

export { getProductsHandler, getProductsByTypeHandler };
