import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishesController } from './dishes/dishes.controller';
import { DishesService } from './dishes/dishes.service';
import { Dish } from './dishes/entities/dish.entity';
import { Product } from './products/entities/product.entity';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { IngredientsController } from './ingredients/ingredients.controller';
import { IngredientService } from './ingredients/ingredient.service';
import { Ingredient } from './ingredients/ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Dish, Ingredient])],
  controllers: [DishesController, ProductsController, IngredientsController],
  providers: [DishesService, ProductsService, IngredientService],
  exports: [DishesService, ProductsService],
})
export class RecipeModule {}
