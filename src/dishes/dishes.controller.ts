import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Dish } from './Dish';
import { UpdateDishDTO, CreateDishDTO } from './dto/DishDTO';

@Controller('dishes')
export class DishesController {
  trackId = 1;
  dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Spaghetti',
      description: 'Spaghetti with tomato sauce',
      servings: 4,
    },
  ];

  @Get()
  readAll(): Dish[] {
    return this.dishes;
  }

  @Post()
  createOne(@Body() dish: CreateDishDTO) {
    const newDish = { id: this.trackId++, ...dish };
    this.dishes.push(newDish);
    return newDish;
  }

  @Put()
  updateOne(@Body() dish: UpdateDishDTO) {
    const dishToUpdate = this.dishes.find(
      (d: Dish) => Number(d.id) === Number(dish.id),
    );

    if (!dishToUpdate) {
      //   throw new Error('Dish with id ' + dish.id + ' not found');
      throw new NotFoundException('Dish with id ' + dish.id + ' not found');
    }

    Object.assign(dishToUpdate, dish);
    return dishToUpdate;
  }

  @Delete(':id')
  deleteOne(@Param('id') dishId: number) {
    const dishExists = this.dishes.some((dish) => dish.id === Number(dishId));

    if (!dishExists) {
      throw new NotFoundException('Dish with id ' + dishId + ' not found');
    }

    this.dishes = this.dishes.filter(
      (dish: Dish) => dish.id !== Number(dishId),
    );

    return { message: `Dish with id ${dishId} deleted` };
  }

  @Get('/exception')
  throwException() {
    throw new HttpException('Dish with id 1 not found', HttpStatus.NOT_FOUND);
  }
}
