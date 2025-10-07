import { DepositsService } from '../deposits/deposits.service';
import { Deposit } from '../deposits/domain/deposit';

import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { SupplierBl } from '../supplier-bls/domain/supplier-bl';
import { SupplierBlsService } from '../supplier-bls/supplier-bls.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateSupplierBlDepositStorageDto } from './dto/create-supplier-bl-deposit-storage.dto';
import { UpdateSupplierBlDepositStorageDto } from './dto/update-supplier-bl-deposit-storage.dto';
import { SupplierBlDepositStorageRepository } from './infrastructure/persistence/supplier-bl-deposit-storage.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SupplierBlDepositStorage } from './domain/supplier-bl-deposit-storage';

@Injectable()
export class SupplierBlDepositStoragesService {
  constructor(
    private readonly depositService: DepositsService,

    private readonly productService: ProductsService,

    @Inject(forwardRef(() => SupplierBlsService))
    private readonly supplierBlService: SupplierBlsService,

    // Dependencies here
    private readonly supplierBlDepositStorageRepository: SupplierBlDepositStorageRepository,
  ) {}

  async create(
    createSupplierBlDepositStorageDto: CreateSupplierBlDepositStorageDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    let depositId: Deposit | null | undefined = undefined;

    if (createSupplierBlDepositStorageDto.depositId) {
      const depositIdObject = await this.depositService.findById(
        createSupplierBlDepositStorageDto.depositId.id,
      );
      if (!depositIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            depositId: 'notExists',
          },
        });
      }
      depositId = depositIdObject;
    } else if (createSupplierBlDepositStorageDto.depositId === null) {
      depositId = null;
    }

    let productId: Product | null | undefined = undefined;

    if (createSupplierBlDepositStorageDto.productId) {
      const productIdObject = await this.productService.findById(
        createSupplierBlDepositStorageDto.productId.id,
      );
      if (!productIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            productId: 'notExists',
          },
        });
      }
      productId = productIdObject;
    } else if (createSupplierBlDepositStorageDto.productId === null) {
      productId = null;
    }

    let SupplierBlId: SupplierBl[] | null | undefined = undefined;

    if (createSupplierBlDepositStorageDto.SupplierBlId) {
      const SupplierBlIdObjects = await this.supplierBlService.findByIds(
        createSupplierBlDepositStorageDto.SupplierBlId.map(
          (entity) => entity.id,
        ),
      );
      if (
        SupplierBlIdObjects.length !==
        createSupplierBlDepositStorageDto.SupplierBlId.length
      ) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            SupplierBlId: 'notExists',
          },
        });
      }
      SupplierBlId = SupplierBlIdObjects;
    } else if (createSupplierBlDepositStorageDto.SupplierBlId === null) {
      SupplierBlId = null;
    }

    return this.supplierBlDepositStorageRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      storedQty: createSupplierBlDepositStorageDto.storedQty,

      date: createSupplierBlDepositStorageDto.date,

      depositId,

      productId,

      SupplierBlId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.supplierBlDepositStorageRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SupplierBlDepositStorage['id']) {
    return this.supplierBlDepositStorageRepository.findById(id);
  }

  findByIds(ids: SupplierBlDepositStorage['id'][]) {
    return this.supplierBlDepositStorageRepository.findByIds(ids);
  }

  async update(
    id: SupplierBlDepositStorage['id'],

    updateSupplierBlDepositStorageDto: UpdateSupplierBlDepositStorageDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let depositId: Deposit | null | undefined = undefined;

    if (updateSupplierBlDepositStorageDto.depositId) {
      const depositIdObject = await this.depositService.findById(
        updateSupplierBlDepositStorageDto.depositId.id,
      );
      if (!depositIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            depositId: 'notExists',
          },
        });
      }
      depositId = depositIdObject;
    } else if (updateSupplierBlDepositStorageDto.depositId === null) {
      depositId = null;
    }

    let productId: Product | null | undefined = undefined;

    if (updateSupplierBlDepositStorageDto.productId) {
      const productIdObject = await this.productService.findById(
        updateSupplierBlDepositStorageDto.productId.id,
      );
      if (!productIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            productId: 'notExists',
          },
        });
      }
      productId = productIdObject;
    } else if (updateSupplierBlDepositStorageDto.productId === null) {
      productId = null;
    }

    let SupplierBlId: SupplierBl[] | null | undefined = undefined;

    if (updateSupplierBlDepositStorageDto.SupplierBlId) {
      const SupplierBlIdObjects = await this.supplierBlService.findByIds(
        updateSupplierBlDepositStorageDto.SupplierBlId.map(
          (entity) => entity.id,
        ),
      );
      if (
        SupplierBlIdObjects.length !==
        updateSupplierBlDepositStorageDto.SupplierBlId.length
      ) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            SupplierBlId: 'notExists',
          },
        });
      }
      SupplierBlId = SupplierBlIdObjects;
    } else if (updateSupplierBlDepositStorageDto.SupplierBlId === null) {
      SupplierBlId = null;
    }

    return this.supplierBlDepositStorageRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      storedQty: updateSupplierBlDepositStorageDto.storedQty,

      date: updateSupplierBlDepositStorageDto.date,

      depositId,

      productId,

      SupplierBlId,
    });
  }

  remove(id: SupplierBlDepositStorage['id']) {
    return this.supplierBlDepositStorageRepository.remove(id);
  }
}
