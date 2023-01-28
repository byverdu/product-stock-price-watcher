import * as cheerio from 'cheerio';
import { get } from '@services/httpClient';
import { Product } from '@types-product-stock-price-watcher';
import { toNumber } from '@services/utils';

const scrapper = async ({ cssSelector, url }: Product) => {
  try {
    const fetchContent = await get(url);
    const pageContent = await fetchContent.text();
    const $ = cheerio.load(pageContent);
    const price = $(cssSelector).first().text();

    return toNumber(price);
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export { scrapper };
