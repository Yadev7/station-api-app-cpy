import { SupplierOrdersService } from '../supplier-orders/supplier-orders.service';
import { SupplierOrder } from '../supplier-orders/domain/supplier-order';

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
import { CreateDevisDto } from './dto/create-devis.dto';
import { UpdateDevisDto } from './dto/update-devis.dto';
import { DevisRepository } from './infrastructure/persistence/devis.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Devis } from './domain/devis';

@Injectable()
export class DevisService {
  constructor(
    @Inject(forwardRef(() => SupplierOrdersService))
    private readonly supplierOrderService: SupplierOrdersService,

    private readonly supplierService: SuppliersService,

    // Dependencies here
    private readonly devisRepository: DevisRepository,
  ) {}

  async create(createDevisDto: CreateDevisDto) {
    // Do not remove comment below.
    // <creating-property />
    const supplierOrderRefObject = await this.supplierOrderService.findById(
      createDevisDto.supplierOrderRef.id,
    );
    if (!supplierOrderRefObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          supplierOrderRef: 'notExists',
        },
      });
    }
    const supplierOrderRef = supplierOrderRefObject;

    let idSupplier: Supplier | null | undefined = undefined;

    if (createDevisDto.idSupplier) {
      const idSupplierObject = await this.supplierService.findById(
        createDevisDto.idSupplier.id,
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
    } else if (createDevisDto.idSupplier === null) {
      idSupplier = null;
    }

    return this.devisRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      supplierOrderRef,

      idSupplier,

      comment: createDevisDto.comment,

      date: createDevisDto.date,

      numRef: createDevisDto.numRef,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.devisRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Devis['id']) {
    return this.devisRepository.findById(id);
  }

  findByIds(ids: Devis['id'][]) {
    return this.devisRepository.findByIds(ids);
  }

  async update(
    id: Devis['id'],

    updateDevisDto: UpdateDevisDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let supplierOrderRef: SupplierOrder | undefined = undefined;

    if (updateDevisDto.supplierOrderRef) {
      const supplierOrderRefObject = await this.supplierOrderService.findById(
        updateDevisDto.supplierOrderRef.id,
      );
      if (!supplierOrderRefObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplierOrderRef: 'notExists',
          },
        });
      }
      supplierOrderRef = supplierOrderRefObject;
    }

    let idSupplier: Supplier | null | undefined = undefined;

    if (updateDevisDto.idSupplier) {
      const idSupplierObject = await this.supplierService.findById(
        updateDevisDto.idSupplier.id,
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
    } else if (updateDevisDto.idSupplier === null) {
      idSupplier = null;
    }

    return this.devisRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      supplierOrderRef,

      idSupplier,

      comment: updateDevisDto.comment,

      date: updateDevisDto.date,

      numRef: updateDevisDto.numRef,
    });
  }

  remove(id: Devis['id']) {
    return this.devisRepository.remove(id);
  }
}
