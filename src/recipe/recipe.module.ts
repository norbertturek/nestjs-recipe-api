import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishesController } from './dishes/dishes.controller';
import { DishesService } from './dishes/dishes.service';
import { Dish } from './dishes/entities/dish.entity';
import { IngredientsModule } from './ingredients/ingredients.module';
import { Product } from './products/entities/product.entity';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Dish]), IngredientsModule],
  controllers: [DishesController, ProductsController],
  providers: [DishesService, ProductsService],
  exports: [DishesService, ProductsService],
})
export class RecipeModule {}
