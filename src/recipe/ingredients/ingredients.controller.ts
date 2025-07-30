import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
// import { CreateIngredientDto } from './dto/create-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get()
  findAll() {
    return 'all ingredients';
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.ingredientService.findById(id);
  }

  @Post()
  create() {
    return 'create ingredient';
  }

  @Put()
  update() {
    return 'update ingredient';
  }

  @Delete()
  remove() {
    return 'remove ingredient';
  }
}
