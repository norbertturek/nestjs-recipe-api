import { Product } from "../products/Product";

export interface Dish {
  id: number;
  name: string;
  description: string;
  servings: number;
  products: Product[];
}
