import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { Dish } from './Dish';
import { CreateDishDTO, UpdateDishDTO } from './dto/DishDTO';

@Injectable()
export class DishesService {
  private trackId = 1;
  private dishes: Dish[] = [
    {
      id: this.trackId++,
      name: 'Overnight Oats',
      description: 'Overnight oats with chia seeds',
      servings: 2,
      products: [],
    },
  ];

  constructor(
    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService,
  ) {}

  create(dish: CreateDishDTO): Dish {
    const newDish = { id: this.trackId++, ...dish, products: [] };
    this.dishes.push(newDish);
    return newDish;
  }

  findAll(): readonly Dish[] {
    return this.dishes;
  }

  findOne(dishId: number): Dish {
    return this.getOneById(dishId);
  }

  getOneById(dishId: number): Dish {
    const dish = this.dishes.find((d: Dish) => d.id === dishId);
    if (!dish) {
      throw new NotFoundException(`Dish with id ${dishId} not found`);
    }
    dish.products = this.productService.getProductsForDish(dishId);
    return dish;
  }

  update(dish: UpdateDishDTO): Dish {
    const dishToUpdate = this.getOneById(dish.id);
    Object.assign(dishToUpdate, dish);
    return dishToUpdate;
  }

  remove(dishId: number): { message: string } {
    this.getOneById(dishId);
    this.dishes = this.dishes.filter((d: Dish) => d.id !== dishId);
    return { message: `Dish with id ${dishId} deleted` };
  }
}
