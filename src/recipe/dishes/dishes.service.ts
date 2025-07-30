import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from './entities/dish.entity';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
  ) {}
  create(dish: CreateDishDto): Promise<Dish> {
    return this.dishRepository.save(dish);
  }

  findAll(): Promise<readonly Dish[]> {
    return this.dishRepository.find({
      relations: ['products'],
    });
  }

  findOne(dishId: number): Promise<Dish> {
    return this.getOneById(dishId);
  }

  async getOneById(dishId: number): Promise<Dish> {
    const dish = await this.dishRepository.findOne({
      where: { id: dishId },
      relations: ['products'],
    });
    if (!dish) {
      throw new NotFoundException(`Dish with id ${dishId} not found`);
    }
    return dish;
  }

  async update(dish: UpdateDishDto) {
    await this.getOneById(dish.id);
    return this.dishRepository.update(dish.id, dish);
  }

  async remove(dishId: number): Promise<Dish> {
    const dishToRemove = await this.getOneById(dishId);
    return this.dishRepository.remove(dishToRemove);
  }
}
