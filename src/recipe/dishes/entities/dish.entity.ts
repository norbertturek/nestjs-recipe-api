import { Ingredient } from 'src/recipe/ingredients/ingredient.entity';
import { Product } from 'src/recipe/products/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('dish')
export class Dish extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ type: 'decimal' })
  servings: number;

  @ManyToOne(() => User, (dish: User) => dish.dishes, { cascade: true })
  user: User;

  @OneToMany(() => Ingredient, (ingredient: Ingredient) => ingredient.dish, {
    cascade: true,
  })
  ingredients: Ingredient[];
}
