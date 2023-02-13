import { AsyncTask } from 'toad-scheduler';
// import { readFileAsync } from '@services/fileManager';
// import config from '@config';
// import { scrapper } from '@services/scrapper';
import { headless } from '@services/headless';
import { Product } from '@types-product-stock-price-watcher';
// import { sendEmail } from '@services/email';
// import { Product } from '../../typings';

const task = new AsyncTask('simple task', async () => {
  try {
    const products = await fetch('http://stock-alert-api:3000/products');
    const productsToEmail: Product[] = [];

    const resp = await products.json();

    if (resp) {
      for (const product of resp) {
        const { price, cssSelector, url } = product;
        const newPrice = await headless({ cssSelector, url });

        console.table({ product, url, newPrice });
        if (newPrice === price) {
          productsToEmail.push({ ...product, newPrice });
        }
      }
      // sendEmail(productsToEmail);
    }
  } catch (e) {
    console.error(e);
  }
});

export { task };

// when stopping your app
// scheduler.stop();
