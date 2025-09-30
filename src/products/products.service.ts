import { StationsService } from '../stations/stations.service';
import { Station } from '../stations/domain/station';

import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/domain/category';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Product } from './domain/product';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(forwardRef(() => StationsService))
    private readonly stationService: StationsService,

    @Inject(forwardRef(() => CategoriesService))
    private readonly categoryService: CategoriesService,

    // Dependencies here
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Do not remove comment below.
    // <creating-property />
    const stationObject = await this.stationService.findById(
      createProductDto.station.id,
    );
    if (!stationObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          station: 'notExists',
        },
      });
    }
    const station = stationObject;

    const categoryObject = await this.categoryService.findById(
      createProductDto.category.id,
    );
    if (!categoryObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          category: 'notExists',
        },
      });
    }
    const category = categoryObject;

    return this.productRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      station,

      category,

      pricesHistory: createProductDto.pricesHistory,

      dateAppliedPrices: createProductDto.dateAppliedPrices,

      salePrice: createProductDto.salePrice,

      purchasePrice: createProductDto.purchasePrice,

      unit: createProductDto.unit,

      totalQuantity: createProductDto.totalQuantity,

      desc: createProductDto.desc,

      name: createProductDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.productRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Product['id']) {
    return this.productRepository.findById(id);
  }

  findByIds(ids: Product['id'][]) {
    return this.productRepository.findByIds(ids);
  }

  async update(
    id: Product['id'],

    updateProductDto: UpdateProductDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let station: Station | undefined = undefined;

    if (updateProductDto.station) {
      const stationObject = await this.stationService.findById(
        updateProductDto.station.id,
      );
      if (!stationObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            station: 'notExists',
          },
        });
      }
      station = stationObject;
    }

    let category: Category | undefined = undefined;

    if (updateProductDto.category) {
      const categoryObject = await this.categoryService.findById(
        updateProductDto.category.id,
      );
      if (!categoryObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            category: 'notExists',
          },
        });
      }
      category = categoryObject;
    }

    return this.productRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      station,

      category,

      pricesHistory: updateProductDto.pricesHistory,

      dateAppliedPrices: updateProductDto.dateAppliedPrices,

      salePrice: updateProductDto.salePrice,

      purchasePrice: updateProductDto.purchasePrice,

      unit: updateProductDto.unit,

      totalQuantity: updateProductDto.totalQuantity,

      desc: updateProductDto.desc,

      name: updateProductDto.name,
    });
  }

  remove(id: Product['id']) {
    return this.productRepository.remove(id);
  }
}
