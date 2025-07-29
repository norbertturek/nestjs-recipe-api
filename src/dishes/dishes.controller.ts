import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Dish } from './Dish';
import { DishesService } from './dishes.service';
import { CreateDishDTO, UpdateDishDTO } from './dto/DishDTO';

@Controller('dishes')
export class DishesController {
  // private dishesService = new DishesService();
  constructor(private readonly dishesService: DishesService) {}

  @Get()
  findAll(): readonly Dish[] {
    return this.dishesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Dish {
    return this.dishesService.findOne(id);
  }

  @Post()
  create(@Body() createDishDto: CreateDishDTO): Dish {
    return this.dishesService.create(createDishDto);
  }

  @Put()
  update(@Body() updateDishDto: UpdateDishDTO): Dish {
    return this.dishesService.update(updateDishDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.dishesService.remove(id);
  }

  @Get('/exception')
  throwException() {
    throw new HttpException('Dish with id 1 not found', HttpStatus.NOT_FOUND);
  }
}
