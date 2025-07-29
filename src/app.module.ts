import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { DishesController } from './dishes/dishes.controller';
import { DishesService } from './dishes/dishes.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, DishesController],
  providers: [AppService, ProductsService, DishesService],
})
export class AppModule {}
