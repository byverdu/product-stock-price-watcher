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

- Schedule when we want to check the products
- Request the url and pass the content to cheerio
- Check if the stored values has changed from the current ones
- If they changed send an email with the info
