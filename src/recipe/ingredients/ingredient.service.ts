import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { IngredientRepository } from './ingredient.repository';

@Injectable()
export class IngredientService {
  private ingredientRepository: IngredientRepository;

  constructor(private dataSource: DataSource) {
    this.ingredientRepository = new IngredientRepository(dataSource);
  }

  async findById(id: string): Promise<Ingredient> {
    const ingredient = await this.ingredientRepository.findById(id);
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with id ${id} not found`);
    }
    return ingredient;
  }
  //   async findAll() {
  //     return this.ingredientRepository.find();
  //   }
}
