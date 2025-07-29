import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Product } from './Product';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DishesService } from 'src/dishes/dishes.service';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private trackId = 1;

  constructor(private readonly dishesService: DishesService) {}  

  create(product: CreateProductDto): Product {
    const newProduct = { id: this.trackId++, ...product };

    this.dishesService.getOneById(product.dishId);

    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): readonly Product[] {
    return this.products;
  }

  findOne(productId: number): Product {
    return this.getOneById(productId);
  }

  getOneById(productId: number): Product {
    const product = this.products.find((p: Product) => p.id === productId);
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }
    return product;
  }

  update(product: UpdateProductDto): Product {
    const productToUpdate = this.getOneById(product.id);
    Object.assign(productToUpdate, product);
    return productToUpdate;
  }

  remove(productId: number) {
    this.getOneById(productId);
    this.products = this.products.filter((p: Product) => p.id !== productId);
    return { message: `Product with id ${productId} deleted` };
  }
}
