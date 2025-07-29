import { Injectable, NotFoundException } from '@nestjs/common';
import { Dish } from './Dish';
import { CreateDishDTO } from './dto/DishDTO';
import { UpdateDishDTO } from './dto/DishDTO';

@Injectable()
export class DishesService {
  private trackId = 1;
  private dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Overnight Oats',
      description: 'Overnight oats with chia seeds',
      servings: 2,
    },
  ];

  create(dish: CreateDishDTO): Dish {
    const newDish = { id: this.trackId++, ...dish };
    this.dishes.push(newDish);
    return newDish;
  }

  findAll(): readonly Dish[] {
    return this.dishes;
  }

  findOne(dishId: number): Dish {
    return this.getOneById(dishId);
  }

  getOneById(dishId: number): Dish {
    const dish = this.dishes.find((d: Dish) => d.id === dishId);
    if (!dish) {
      throw new NotFoundException(`Dish with id ${dishId} not found`);
    }
    return dish;
  }

  update(dish: UpdateDishDTO): Dish {
    const dishToUpdate = this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);
    return dishToUpdate;
  }

  remove(dishId: number): { message: string } {
    this.getOneById(dishId);
    this.dishes = this.dishes.filter((d: Dish) => d.id !== dishId);
    return { message: `Dish with id ${dishId} deleted` };
  }
}
