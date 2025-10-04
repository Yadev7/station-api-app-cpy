import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { SuppliersService } from '../suppliers/suppliers.service';
import { Supplier } from '../suppliers/domain/supplier';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateSupplierOrderDetailsDto } from './dto/create-supplier-order-details.dto';
import { UpdateSupplierOrderDetailsDto } from './dto/update-supplier-order-details.dto';
import { SupplierOrderDetailsRepository } from './infrastructure/persistence/supplier-order-details.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SupplierOrderDetails } from './domain/supplier-order-details';

@Injectable()
export class SupplierOrderDetailsService {
  constructor(
    private readonly productService: ProductsService,

    private readonly supplierService: SuppliersService,

    // Dependencies here
    private readonly supplierOrderDetailsRepository: SupplierOrderDetailsRepository,
  ) {}

  async create(createSupplierOrderDetailsDto: CreateSupplierOrderDetailsDto) {
    // Do not remove comment below.
    // <creating-property />
    let ProductId: Product | null | undefined = undefined;

    if (createSupplierOrderDetailsDto.ProductId) {
      const ProductIdObject = await this.productService.findById(
        createSupplierOrderDetailsDto.ProductId.id,
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
    } else if (createSupplierOrderDetailsDto.ProductId === null) {
      ProductId = null;
    }

    let SupplierId: Supplier | null | undefined = undefined;

    if (createSupplierOrderDetailsDto.SupplierId) {
      const SupplierIdObject = await this.supplierService.findById(
        createSupplierOrderDetailsDto.SupplierId.id,
      );
      if (!SupplierIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            SupplierId: 'notExists',
          },
        });
      }
      SupplierId = SupplierIdObject;
    } else if (createSupplierOrderDetailsDto.SupplierId === null) {
      SupplierId = null;
    }

    return this.supplierOrderDetailsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      ProductId,

      SupplierId,

      unitPrice: createSupplierOrderDetailsDto.unitPrice,

      orderQty: createSupplierOrderDetailsDto.orderQty,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.supplierOrderDetailsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SupplierOrderDetails['id']) {
    return this.supplierOrderDetailsRepository.findById(id);
  }

  findByIds(ids: SupplierOrderDetails['id'][]) {
    return this.supplierOrderDetailsRepository.findByIds(ids);
  }

  async update(
    id: SupplierOrderDetails['id'],

    updateSupplierOrderDetailsDto: UpdateSupplierOrderDetailsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let ProductId: Product | null | undefined = undefined;

    if (updateSupplierOrderDetailsDto.ProductId) {
      const ProductIdObject = await this.productService.findById(
        updateSupplierOrderDetailsDto.ProductId.id,
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
    } else if (updateSupplierOrderDetailsDto.ProductId === null) {
      ProductId = null;
    }

    let SupplierId: Supplier | null | undefined = undefined;

    if (updateSupplierOrderDetailsDto.SupplierId) {
      const SupplierIdObject = await this.supplierService.findById(
        updateSupplierOrderDetailsDto.SupplierId.id,
      );
      if (!SupplierIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            SupplierId: 'notExists',
          },
        });
      }
      SupplierId = SupplierIdObject;
    } else if (updateSupplierOrderDetailsDto.SupplierId === null) {
      SupplierId = null;
    }

    return this.supplierOrderDetailsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      ProductId,

      SupplierId,

      unitPrice: updateSupplierOrderDetailsDto.unitPrice,

      orderQty: updateSupplierOrderDetailsDto.orderQty,
    });
  }

  remove(id: SupplierOrderDetails['id']) {
    return this.supplierOrderDetailsRepository.remove(id);
  }
}
