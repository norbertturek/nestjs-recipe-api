import { OmitType } from '@nestjs/mapped-types/dist';
import { UpdateDishDto } from './update-dish.dto';

export class CreateDishDto extends OmitType(UpdateDishDto, ['id'] as const) {}
