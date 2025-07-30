import { Dish } from 'src/recipe/dishes/entities/dish.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @OneToMany(() => Dish, (dish: Dish) => dish.user)
  dishes: Dish[];

  @Column({ type: 'boolean', default: false })
  isPublic: number;
}
