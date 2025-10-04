import { DevisService } from '../devis/devis.service';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';
import { Devis } from '../devis/domain/devis';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateDevisProductDto } from './dto/create-devis-product.dto';
import { UpdateDevisProductDto } from './dto/update-devis-product.dto';
import { DevisProductRepository } from './infrastructure/persistence/devis-product.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { DevisProduct } from './domain/devis-product';

@Injectable()
export class DevisProductsService {
  constructor(
    private readonly devisService: DevisService,

    private readonly productService: ProductsService,

    // Dependencies here
    private readonly devisProductRepository: DevisProductRepository,
  ) {}

  async create(createDevisProductDto: CreateDevisProductDto) {
    // Do not remove comment below.
    // <creating-property />

    let idDevis: Devis | null | undefined = undefined;

    if (createDevisProductDto.idDevis) {
      const idDevisObject = await this.devisService.findById(
        createDevisProductDto.idDevis.id,
      );
      if (!idDevisObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            idDevis: 'notExists',
          },
        });
      }
      idDevis = idDevisObject;
    } else if (createDevisProductDto.idDevis === null) {
      idDevis = null;
    }

    let idProduct: Product | null | undefined = undefined;

    if (createDevisProductDto.idProduct) {
      const idProductObject = await this.productService.findById(
        createDevisProductDto.idProduct.id,
      );
      if (!idProductObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            idProduct: 'notExists',
          },
        });
      }
      idProduct = idProductObject;
    } else if (createDevisProductDto.idProduct === null) {
      idProduct = null;
    }

    return this.devisProductRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      SupplierPrice: createDevisProductDto.SupplierPrice,

      unit: createDevisProductDto.unit,

      Qty: createDevisProductDto.Qty,

      idDevis,

      idProduct,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.devisProductRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: DevisProduct['id']) {
    return this.devisProductRepository.findById(id);
  }

  findByIds(ids: DevisProduct['id'][]) {
    return this.devisProductRepository.findByIds(ids);
  }

  async update(
    id: DevisProduct['id'],

    updateDevisProductDto: UpdateDevisProductDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let idDevis: Devis | null | undefined = undefined;

    if (updateDevisProductDto.idDevis) {
      const idDevisObject = await this.devisService.findById(
        updateDevisProductDto.idDevis.id,
      );
      if (!idDevisObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            idDevis: 'notExists',
          },
        });
      }
      idDevis = idDevisObject;
    } else if (updateDevisProductDto.idDevis === null) {
      idDevis = null;
    }

    let idProduct: Product | null | undefined = undefined;

    if (updateDevisProductDto.idProduct) {
      const idProductObject = await this.productService.findById(
        updateDevisProductDto.idProduct.id,
      );
      if (!idProductObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            idProduct: 'notExists',
          },
        });
      }
      idProduct = idProductObject;
    } else if (updateDevisProductDto.idProduct === null) {
      idProduct = null;
    }

    return this.devisProductRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      SupplierPrice: updateDevisProductDto.SupplierPrice,

      unit: updateDevisProductDto.unit,

      Qty: updateDevisProductDto.Qty,

      idDevis,

      idProduct,
    });
  }

  remove(id: DevisProduct['id']) {
    return this.devisProductRepository.remove(id);
  }
}
