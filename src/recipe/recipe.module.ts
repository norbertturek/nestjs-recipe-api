import { Module } from '@nestjs/common';
import { DishesController } from './dishes/dishes.controller';
import { DishesService } from './dishes/dishes.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';

@Module({
  controllers: [DishesController, ProductsController],
  providers: [DishesService, ProductsService],
  exports: [DishesService, ProductsService],
})
export class RecipeModule {}
