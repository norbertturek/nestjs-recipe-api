import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  async create(product: CreateProductDto): Promise<Product> {
    const newProduct = new Product();
    Object.assign(newProduct, product);
    return newProduct.save();
  }

  getProductsForDish(dishId: number): Promise<Product[]> {
    return Product.find({ where: { dishId } });
  }

  findAll(): Promise<readonly Product[]> {
    return Product.find();
  }

  findOne(productId: number): Promise<Product> {
    return this.getOneById(productId);
  }

  async getOneById(productId: number): Promise<Product> {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }
    return product;
  }

  async update(product: UpdateProductDto): Promise<Product> {
    const productToUpdate = await this.getOneById(product.id);
    Object.assign(productToUpdate, product);
    return productToUpdate.save();
  }

  async remove(productId: number): Promise<Product> {
    const productToRemove = await this.getOneById(productId);
    return await productToRemove.remove();
  }
}
