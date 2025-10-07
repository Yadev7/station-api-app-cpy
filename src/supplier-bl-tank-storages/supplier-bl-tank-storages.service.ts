import { TanksService } from '../tanks/tanks.service';
import { Tank } from '../tanks/domain/tank';

import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { SupplierBlsService } from '../supplier-bls/supplier-bls.service';
import { SupplierBl } from '../supplier-bls/domain/supplier-bl';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateSupplierBlTankStorageDto } from './dto/create-supplier-bl-tank-storage.dto';
import { UpdateSupplierBlTankStorageDto } from './dto/update-supplier-bl-tank-storage.dto';
import { SupplierBlTankStorageRepository } from './infrastructure/persistence/supplier-bl-tank-storage.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SupplierBlTankStorage } from './domain/supplier-bl-tank-storage';

@Injectable()
export class SupplierBlTankStoragesService {
  constructor(
    private readonly tankService: TanksService,

    private readonly productService: ProductsService,

    private readonly supplierBlService: SupplierBlsService,

    // Dependencies here
    private readonly supplierBlTankStorageRepository: SupplierBlTankStorageRepository,
  ) {}

  async create(createSupplierBlTankStorageDto: CreateSupplierBlTankStorageDto) {
    // Do not remove comment below.
    // <creating-property />

    let TankId: Tank | null | undefined = undefined;

    if (createSupplierBlTankStorageDto.TankId) {
      const TankIdObject = await this.tankService.findById(
        createSupplierBlTankStorageDto.TankId.id,
      );
      if (!TankIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            TankId: 'notExists',
          },
        });
      }
      TankId = TankIdObject;
    } else if (createSupplierBlTankStorageDto.TankId === null) {
      TankId = null;
    }

    let ProductId: Product | null | undefined = undefined;

    if (createSupplierBlTankStorageDto.ProductId) {
      const ProductIdObject = await this.productService.findById(
        createSupplierBlTankStorageDto.ProductId.id,
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
    } else if (createSupplierBlTankStorageDto.ProductId === null) {
      ProductId = null;
    }

    let SupplierBlId: SupplierBl | null | undefined = undefined;

    if (createSupplierBlTankStorageDto.SupplierBlId) {
      const SupplierBlIdObject = await this.supplierBlService.findById(
        createSupplierBlTankStorageDto.SupplierBlId.id,
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
    } else if (createSupplierBlTankStorageDto.SupplierBlId === null) {
      SupplierBlId = null;
    }

    return this.supplierBlTankStorageRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      storedQty: createSupplierBlTankStorageDto.storedQty,

      TankId,

      ProductId,

      SupplierBlId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.supplierBlTankStorageRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SupplierBlTankStorage['id']) {
    return this.supplierBlTankStorageRepository.findById(id);
  }

  findByIds(ids: SupplierBlTankStorage['id'][]) {
    return this.supplierBlTankStorageRepository.findByIds(ids);
  }

  async update(
    id: SupplierBlTankStorage['id'],

    updateSupplierBlTankStorageDto: UpdateSupplierBlTankStorageDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let TankId: Tank | null | undefined = undefined;

    if (updateSupplierBlTankStorageDto.TankId) {
      const TankIdObject = await this.tankService.findById(
        updateSupplierBlTankStorageDto.TankId.id,
      );
      if (!TankIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            TankId: 'notExists',
          },
        });
      }
      TankId = TankIdObject;
    } else if (updateSupplierBlTankStorageDto.TankId === null) {
      TankId = null;
    }

    let ProductId: Product | null | undefined = undefined;

    if (updateSupplierBlTankStorageDto.ProductId) {
      const ProductIdObject = await this.productService.findById(
        updateSupplierBlTankStorageDto.ProductId.id,
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
    } else if (updateSupplierBlTankStorageDto.ProductId === null) {
      ProductId = null;
    }

    let SupplierBlId: SupplierBl | null | undefined = undefined;

    if (updateSupplierBlTankStorageDto.SupplierBlId) {
      const SupplierBlIdObject = await this.supplierBlService.findById(
        updateSupplierBlTankStorageDto.SupplierBlId.id,
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
    } else if (updateSupplierBlTankStorageDto.SupplierBlId === null) {
      SupplierBlId = null;
    }

    return this.supplierBlTankStorageRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      storedQty: updateSupplierBlTankStorageDto.storedQty,

      TankId,

      ProductId,

      SupplierBlId,
    });
  }

  remove(id: SupplierBlTankStorage['id']) {
    return this.supplierBlTankStorageRepository.remove(id);
  }
}
