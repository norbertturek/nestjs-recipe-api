import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './ingredient.entity';
import { IngredientsController } from './ingredients.controller';
import { IngredientService } from './ingredient.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  controllers: [IngredientsController],
  providers: [IngredientService],
  exports: [IngredientService],
})
export class IngredientsModule {}
