import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DishesService } from 'src/dishes/dishes.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, DishesService],
})
export class ProductsModule {}
