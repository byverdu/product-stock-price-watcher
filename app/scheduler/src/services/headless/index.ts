/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { toNumber } from '@services/utils';
import { launch } from 'puppeteer';

interface Params {
  url: string;
  cssSelector: string;
}

const headless = async ({ url, cssSelector }: Params) => {
  let textContent;

  try {
    const browser = await launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.goto(url);

    const textSelector = await page.waitForSelector(cssSelector);

    if (textSelector) {
      const text = (await textSelector.evaluate(el => el.textContent)) ?? '';
      textContent = toNumber(text as string);
    }

    await browser.close();
  } catch (error) {
    console.error(error);
  }

  return textContent;
};

export { headless };
