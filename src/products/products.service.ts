import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { DishesService } from '../recipe/dishes/dishes.service';
import { CreateProductDto } from '../recipe/products/dto/create-product.dto';
import { UpdateProductDto } from '../recipe/products/dto/update-product.dto';
import { Product } from '../recipe/products/model/Product';

@Injectable()
export class ProductsService {
  private trackId = 1;
  private products: Product[] = [
    {
      id: this.trackId++,
      name: 'Chia seeds',
      unit: 'g',
      amount: 100,
      dishId: 1,
    },
  ];

  constructor(
    @Inject(forwardRef(() => DishesService))
    private readonly dishesService: DishesService,
  ) {}

  create(product: CreateProductDto): Product {
    const newProduct = { id: this.trackId++, ...product };

    this.dishesService.getOneById(product.dishId);

    this.products.push(newProduct);
    return newProduct;
  }

  getProductsForDish(dishId: number): Product[] {
    return this.products.filter((p: Product) => p.dishId === dishId);
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
