import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './entities/dish.entity';

@Injectable()
export class DishesService {
  create(dish: CreateDishDto): Promise<Dish> {
    const newDish = new Dish();
    Object.assign(newDish, dish);
    return newDish.save();
  }

  findAll(): Promise<readonly Dish[]> {
    return Dish.find({
      relations: ['products'],
    });
  }

  findOne(dishId: number): Promise<Dish> {
    return this.getOneById(dishId);
  }

  async getOneById(dishId: number): Promise<Dish> {
    const dish = await Dish.findOne({ where: { id: dishId } });
    if (!dish) {
      throw new NotFoundException(`Dish with id ${dishId} not found`);
    }
    return dish;
  }

  async update(dish: UpdateDishDto): Promise<Dish> {
    const dishToUpdate = await this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);
    return dishToUpdate.save();
  }

  async remove(dishId: number): Promise<Dish> {
    const dishToRemove = await this.getOneById(dishId);
    return dishToRemove.remove();
  }
}
