import { DevisService } from '../devis/devis.service';
import { Devis } from '../devis/domain/devis';

import { SuppliersService } from '../suppliers/suppliers.service';
import { Supplier } from '../suppliers/domain/supplier';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateSupplierOrderDto } from './dto/create-supplier-order.dto';
import { UpdateSupplierOrderDto } from './dto/update-supplier-order.dto';
import { SupplierOrderRepository } from './infrastructure/persistence/supplier-order.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SupplierOrder } from './domain/supplier-order';

@Injectable()
export class SupplierOrdersService {
  constructor(
    @Inject(forwardRef(() => DevisService))
    private readonly devisService: DevisService,

    private readonly supplierService: SuppliersService,

    // Dependencies here
    private readonly supplierOrderRepository: SupplierOrderRepository,
  ) {}

  async create(createSupplierOrderDto: CreateSupplierOrderDto) {
    // Do not remove comment below.
    // <creating-property />

    let idDevis: Devis[] | null | undefined = undefined;

    if (createSupplierOrderDto.idDevis) {
      const idDevisObjects = await this.devisService.findByIds(
        createSupplierOrderDto.idDevis.map((entity) => entity.id),
      );
      if (idDevisObjects.length !== createSupplierOrderDto.idDevis.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            idDevis: 'notExists',
          },
        });
      }
      idDevis = idDevisObjects;
    } else if (createSupplierOrderDto.idDevis === null) {
      idDevis = null;
    }

    let idSupplier: Supplier | null | undefined = undefined;

    if (createSupplierOrderDto.idSupplier) {
      const idSupplierObject = await this.supplierService.findById(
        createSupplierOrderDto.idSupplier.id,
      );
      if (!idSupplierObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            idSupplier: 'notExists',
          },
        });
      }
      idSupplier = idSupplierObject;
    } else if (createSupplierOrderDto.idSupplier === null) {
      idSupplier = null;
    }

    return this.supplierOrderRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      orderSupplierState: createSupplierOrderDto.orderSupplierState,

      idDevis,

      Amount: createSupplierOrderDto.Amount,

      orderState: createSupplierOrderDto.orderState,

      orderRef: createSupplierOrderDto.orderRef,

      date: createSupplierOrderDto.date,

      idSupplier,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.supplierOrderRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SupplierOrder['id']) {
    return this.supplierOrderRepository.findById(id);
  }

  findByIds(ids: SupplierOrder['id'][]) {
    return this.supplierOrderRepository.findByIds(ids);
  }

  async update(
    id: SupplierOrder['id'],

    updateSupplierOrderDto: UpdateSupplierOrderDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let idDevis: Devis[] | null | undefined = undefined;

    if (updateSupplierOrderDto.idDevis) {
      const idDevisObjects = await this.devisService.findByIds(
        updateSupplierOrderDto.idDevis.map((entity) => entity.id),
      );
      if (idDevisObjects.length !== updateSupplierOrderDto.idDevis.length) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            idDevis: 'notExists',
          },
        });
      }
      idDevis = idDevisObjects;
    } else if (updateSupplierOrderDto.idDevis === null) {
      idDevis = null;
    }

    let idSupplier: Supplier | null | undefined = undefined;

    if (updateSupplierOrderDto.idSupplier) {
      const idSupplierObject = await this.supplierService.findById(
        updateSupplierOrderDto.idSupplier.id,
      );
      if (!idSupplierObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            idSupplier: 'notExists',
          },
        });
      }
      idSupplier = idSupplierObject;
    } else if (updateSupplierOrderDto.idSupplier === null) {
      idSupplier = null;
    }

    return this.supplierOrderRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      orderSupplierState: updateSupplierOrderDto.orderSupplierState,

      idDevis,

      Amount: updateSupplierOrderDto.Amount,

      orderState: updateSupplierOrderDto.orderState,

      orderRef: updateSupplierOrderDto.orderRef,

      date: updateSupplierOrderDto.date,

      idSupplier,
    });
  }

  remove(id: SupplierOrder['id']) {
    return this.supplierOrderRepository.remove(id);
  }
}
