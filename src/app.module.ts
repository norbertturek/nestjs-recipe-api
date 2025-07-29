import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { DishesModule } from './dishes/dishes.module';

@Module({
  imports: [ProductsModule, DishesModule],
  controllers: [AppController],
})
export class AppModule {}
