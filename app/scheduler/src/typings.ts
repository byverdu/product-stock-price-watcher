declare module '@types-product-stock-price-watcher' {
  export type WatchType = 'price' | 'stock';

  export interface Product {
    id: string;
    brand: string;
    url: string;
    type: WatchType;
    price: number;
    newPrice?: number;
    cssSelector: string;
  }

  export interface AppConfig {
    dataPath: string;
  }
}
