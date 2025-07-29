import { OmitType } from '@nestjs/mapped-types';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateDishDTO {
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

export class CreateDishDTO extends OmitType(UpdateDishDTO, ['id'] as const) {}
