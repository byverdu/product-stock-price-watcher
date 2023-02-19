import { ToadScheduler, SimpleIntervalJob, AsyncTask } from 'toad-scheduler';
import { readFileAsync } from '@services/fileManager';
import config from '@config';
// import { scrapper } from '@services/scrapper';
import { headless } from '@services/headless';
// import { sendEmail } from '@services/email';
import { Product } from '@types-product-stock-price-watcher';

const scheduler = new ToadScheduler();

const task = new AsyncTask('simple task', async () => {
  const products = await readFileAsync(config.dataPath);
  const productsToEmail: Product[] = [];

  if (products) {
    for (const product of products) {
      const { price, cssSelector, url } = product;
      const newPrice = await headless({ cssSelector, url });

      if (newPrice === price) {
        productsToEmail.push({ ...product, newPrice });
      }
    }
    // sendEmail(productsToEmail);
  }
});

const job = new SimpleIntervalJob({ hours: 30, runImmediately: true }, task);

scheduler.addSimpleIntervalJob(job);

// when stopping your app
// scheduler.stop();
