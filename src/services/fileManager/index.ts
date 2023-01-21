import { Product } from '@types-product-stock-price-watcher';
import { promises } from 'fs';

const { writeFile, readFile } = promises;

const writeFileAsync = async (newContent: Product[], path: string) => {
  try {
    await writeFile(path, JSON.stringify(newContent), { encoding: 'utf-8' });

    return 'Data saved';
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const readFileAsync = async (path: string) => {
  try {
    const fileContent = await readFile(path, { encoding: 'utf-8' });

    if (typeof fileContent !== 'string') {
      return null;
    }

    return JSON.parse(fileContent) as Product[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { writeFileAsync, readFileAsync };
