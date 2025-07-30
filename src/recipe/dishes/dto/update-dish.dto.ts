import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateDishDto {
  @IsNumber({}, { message: 'ID must be a number' })
  id: number;

  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNumber({}, { message: 'Servings must be a number' })
  servings: number;
}
