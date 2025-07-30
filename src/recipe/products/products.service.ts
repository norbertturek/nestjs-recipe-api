import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  // async getProductsForDish(dishId: number): Promise<Product[]> {
  //   return this.productRepository.find({ where: { dishId } });
  // }

  findAll(): Promise<readonly Product[]> {
    return this.productRepository.find();
  }

  findOne(productId: number): Promise<Product> {
    return this.getOneById(productId);
  }

  async getOneById(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }
    return product;
  }

  async update(product: UpdateProductDto): Promise<Product> {
    await this.getOneById(product.id);
    return this.productRepository.save({
      id: product.id,
      dishId: product.dishId,
    });
  }

  async remove(productId: number): Promise<Product> {
    const productToRemove = await this.getOneById(productId);
    return this.productRepository.remove(productToRemove);
  }
}
