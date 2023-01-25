declare module '@types-product-stock-price-watcher' {
  export interface HttpClientArgs {
    url: string;
    params?: import('undici').RequestInit;
  }

  export interface HttpClient {
    get: ({
      url,
    }: Pick<HttpClientArgs, 'url'>) => Promise<import('undici').Response>;
    post: (params: HttpClientArgs) => Promise<import('undici').Response>;
  }

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
