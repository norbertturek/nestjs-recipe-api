import { Product } from "src/products/Product";

export interface Dish {
  id: number;
  name: string;
  description: string;
  servings: number;
  products: Product[];
}
