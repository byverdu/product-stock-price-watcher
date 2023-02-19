import * as cheerio from 'cheerio';
import { get } from '@services/httpClient';
import { toNumber } from '@services/utils';

const scrapper = async ({
  cssSelector,
  url,
}: {
  cssSelector: string;
  url: string;
}) => {
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
