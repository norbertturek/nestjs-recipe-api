import { DataSource, Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';

export class IngredientRepository extends Repository<Ingredient> {
  constructor(dataSource: DataSource) {
    super(Ingredient, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<Ingredient | null> {
    return this.createQueryBuilder('ingredient')
      .innerJoinAndSelect('ingredient.dish', 'dish')
      .innerJoinAndSelect('ingredient.product', 'product')
      .where('ingredient.id = :id', { id })
      .getOne();
  }
}
