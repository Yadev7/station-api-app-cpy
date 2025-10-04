import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';
import { SupplierBl } from '../supplier-bls/domain/supplier-bl';

import { SupplierBlsService } from '../supplier-bls/supplier-bls.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateSupplierBlDetailsDto } from './dto/create-supplier-bl-details.dto';
import { UpdateSupplierBlDetailsDto } from './dto/update-supplier-bl-details.dto';
import { SupplierBlDetailsRepository } from './infrastructure/persistence/supplier-bl-details.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SupplierBlDetails } from './domain/supplier-bl-details';

@Injectable()
export class SupplierBlDetailsService {
  constructor(
    private readonly productService: ProductsService,

    private readonly supplierBlService: SupplierBlsService,

    // Dependencies here
    private readonly supplierBlDetailsRepository: SupplierBlDetailsRepository,
  ) {}

  async create(createSupplierBlDetailsDto: CreateSupplierBlDetailsDto) {
    // Do not remove comment below.
    // <creating-property />

    let ProductId: Product | null | undefined = undefined;

    if (createSupplierBlDetailsDto.ProductId) {
      const ProductIdObject = await this.productService.findById(
        createSupplierBlDetailsDto.ProductId.id,
      );
      if (!ProductIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            ProductId: 'notExists',
          },
        });
      }
      ProductId = ProductIdObject;
    } else if (createSupplierBlDetailsDto.ProductId === null) {
      ProductId = null;
    }

    let SupplierBlId: SupplierBl | null | undefined = undefined;

    if (createSupplierBlDetailsDto.SupplierBlId) {
      const SupplierBlIdObject = await this.supplierBlService.findById(
        createSupplierBlDetailsDto.SupplierBlId.id,
      );
      if (!SupplierBlIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            SupplierBlId: 'notExists',
          },
        });
      }
      SupplierBlId = SupplierBlIdObject;
    } else if (createSupplierBlDetailsDto.SupplierBlId === null) {
      SupplierBlId = null;
    }

    return this.supplierBlDetailsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      price: createSupplierBlDetailsDto.price,

      unitPrice: createSupplierBlDetailsDto.unitPrice,

      deliveredQty: createSupplierBlDetailsDto.deliveredQty,

      ProductId,

      SupplierBlId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.supplierBlDetailsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SupplierBlDetails['id']) {
    return this.supplierBlDetailsRepository.findById(id);
  }

  findByIds(ids: SupplierBlDetails['id'][]) {
    return this.supplierBlDetailsRepository.findByIds(ids);
  }

  async update(
    id: SupplierBlDetails['id'],

    updateSupplierBlDetailsDto: UpdateSupplierBlDetailsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let ProductId: Product | null | undefined = undefined;

    if (updateSupplierBlDetailsDto.ProductId) {
      const ProductIdObject = await this.productService.findById(
        updateSupplierBlDetailsDto.ProductId.id,
      );
      if (!ProductIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            ProductId: 'notExists',
          },
        });
      }
      ProductId = ProductIdObject;
    } else if (updateSupplierBlDetailsDto.ProductId === null) {
      ProductId = null;
    }

    let SupplierBlId: SupplierBl | null | undefined = undefined;

    if (updateSupplierBlDetailsDto.SupplierBlId) {
      const SupplierBlIdObject = await this.supplierBlService.findById(
        updateSupplierBlDetailsDto.SupplierBlId.id,
      );
      if (!SupplierBlIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            SupplierBlId: 'notExists',
          },
        });
      }
      SupplierBlId = SupplierBlIdObject;
    } else if (updateSupplierBlDetailsDto.SupplierBlId === null) {
      SupplierBlId = null;
    }

    return this.supplierBlDetailsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      price: updateSupplierBlDetailsDto.price,

      unitPrice: updateSupplierBlDetailsDto.unitPrice,

      deliveredQty: updateSupplierBlDetailsDto.deliveredQty,

      ProductId,

      SupplierBlId,
    });
  }

  remove(id: SupplierBlDetails['id']) {
    return this.supplierBlDetailsRepository.remove(id);
  }
}
