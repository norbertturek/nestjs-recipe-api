import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNumber({}, { message: 'ID must be a number' })
  id: number;

  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsString({ message: 'Unit must be a string' })
  unit: 'kg' | 'g' | 'tsp' | 'sp' | 'pinch' | 'ml' | 'l' | 'item';

  @IsNumber({}, { message: 'Amount must be a number' })
  amount: number;

  @IsNumber({}, { message: 'Dish ID must be a number' })
  dishId: number;
}
