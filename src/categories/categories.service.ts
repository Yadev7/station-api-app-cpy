import {
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './infrastructure/persistence/category.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Category } from './domain/category';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoryRepository: CategoryRepository,

    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    // --- Handle children ---
    let children: Category[] | null | undefined = undefined;
    if (createCategoryDto.children) {
      const childrenObjects = await this.findByIds(
        createCategoryDto.children.map((entity) => entity.id),
      );
      if (childrenObjects.length !== createCategoryDto.children.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { children: 'notExists' },
        });
      }
      children = childrenObjects;
    } else if (createCategoryDto.children === null) {
      children = null;
    }

    // --- Handle parent ---
    let catParent: Category | null = null;
    if (createCategoryDto.catParent?.id) {
      const catParentObject = await this.findById(
        createCategoryDto.catParent.id,
      );
      if (!catParentObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { catParent: 'notExists' },
        });
      }
      catParent = catParentObject;
    }

    // --- Handle products ---
    let products: Product[] | null | undefined = undefined;
    if (createCategoryDto.products) {
      const productsObjects = await this.productService.findByIds(
        createCategoryDto.products.map((entity) => entity.id),
      );
      if (productsObjects.length !== createCategoryDto.products.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { products: 'notExists' },
        });
      }
      products = productsObjects;
    } else if (createCategoryDto.products === null) {
      products = null;
    }

    return this.categoryRepository.create({
      catName: createCategoryDto.catName,
      children,
      catParent,
      products,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.categoryRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Category['id']) {
    return this.categoryRepository.findById(id);
  }

  findByIds(ids: Category['id'][]) {
    return this.categoryRepository.findByIds(ids);
  }

  async update(id: Category['id'], updateCategoryDto: UpdateCategoryDto) {
    // --- Handle children ---
    let children: Category[] | null | undefined = undefined;
    if (updateCategoryDto.children) {
      const childrenObjects = await this.findByIds(
        updateCategoryDto.children.map((entity) => entity.id),
      );
      if (childrenObjects.length !== updateCategoryDto.children.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { children: 'notExists' },
        });
      }
      children = childrenObjects;
    } else if (updateCategoryDto.children === null) {
      children = null;
    }

    // --- Handle parent ---
    let catParent: Category | null | undefined = undefined;
    if (updateCategoryDto.catParent?.id) {
      const catParentObject = await this.findById(
        updateCategoryDto.catParent.id,
      );
      if (!catParentObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { catParent: 'notExists' },
        });
      }
      catParent = catParentObject;
    } else if (updateCategoryDto.catParent === null) {
      catParent = null;
    }

    // --- Handle products ---
    let products: Product[] | null | undefined = undefined;
    if (updateCategoryDto.products) {
      const productsObjects = await this.productService.findByIds(
        updateCategoryDto.products.map((entity) => entity.id),
      );
      if (productsObjects.length !== updateCategoryDto.products.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: { products: 'notExists' },
        });
      }
      products = productsObjects;
    } else if (updateCategoryDto.products === null) {
      products = null;
    }

    return this.categoryRepository.update(id, {
      catName: updateCategoryDto.catName,
      children,
      catParent,
      products,
    });
  }

  remove(id: Category['id']) {
    return this.categoryRepository.remove(id);
  }
}
