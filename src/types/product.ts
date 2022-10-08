export interface Product {
  id: string;
  title: string;
  price: number;
  count: number;
  description: string;
}

export type Products = Product[];
