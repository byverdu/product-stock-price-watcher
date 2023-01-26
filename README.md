# product-stock-price-watcher

Ability to get alerts when a product price changes or new products are added.

## To get alerts about prices we need

- The url of the product
- Name of the brand
- The current price
- The CSS selector for the price

## To get alerts about new products we need

- The url for all the products
- Name of the brand
- Check if the first item displayed has changed
- The CSS selector for the price

## How to do it

- Create an API with [Express](https://expressjs.com/) to interact with products.
- Schedule when the App will check the products, possible npm packages:
  - [Node-schedule](https://www.npmjs.com/package/node-schedule)
  - [Agenda](https://github.com/agenda/agenda)
  - [Bree](https://github.com/breejs/bree)
  - [node-cron](https://www.npmjs.com/package/node-cron)
- Scrape the products page with [Cheerio](https://cheerio.js.org/)
- Send emails with [Nodemailer](https://nodemailer.com/about/)
- Handle app crashes with [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/)

## Next on the list

- [x] API
- [ ] Scheduler service
- [ ] Web scrapper service
- [ ] Email sender service
- [ ] PM2 setup


## Things to refactor

- [ ] return values from Promises, Boolean or String
- [ ] add more props to Product, `urlImg`, `description`, `createdDate` and maybe `hasChanged`? although if it has `newPrice` it changed
- [ ] move `res.status(200)`, so only one is used
- [ ] change `config.dataPath`
- [ ] endpoint to fetch products that price has changed