import { Product } from 'src/recipe/products/entities/product.entity';
import { Dish } from 'src/recipe/dishes/entities/dish.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('ingredient')
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  amount: number;

  @ManyToOne(() => Product, (product: Product) => product.ingredients)
  product: Product;

  @ManyToOne(() => Dish, (dish: Dish) => dish.ingredients)
  dish: Dish;
}
