import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    return this.productRepo.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updateResult = await this.productRepo.update(id, updateProductDto);
    if (!updateResult.affected) {
      throw new EntityNotFoundError(Product, id);
    }
    return this.productRepo.findOne(id);
  }

  async remove(id: number) {
    const deleteResult = await this.productRepo.delete(id);
    if (!deleteResult.affected) {
      throw new EntityNotFoundError(Product, id);
    }
  }
}
