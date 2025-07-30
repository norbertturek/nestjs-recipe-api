import { Ingredient } from 'src/recipe/ingredients/ingredient.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  unit: 'kg' | 'g' | 'tsp' | 'sp' | 'pinch' | 'ml' | 'l' | 'item';

  @OneToMany(() => Ingredient, (ingredient: Ingredient) => ingredient.product, {
    cascade: true,
  })
  ingredients: Ingredient[];
}
