import { OmitType } from '@nestjs/mapped-types';
import { UpdateProductDto } from './update-product.dto';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductDto extends OmitType(UpdateProductDto, [
  'id',
] as const) {}
