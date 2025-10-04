import { SupplierOrdersService } from '../supplier-orders/supplier-orders.service';
import { SupplierOrder } from '../supplier-orders/domain/supplier-order';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateSupplierBlDto } from './dto/create-supplier-bl.dto';
import { UpdateSupplierBlDto } from './dto/update-supplier-bl.dto';
import { SupplierBlRepository } from './infrastructure/persistence/supplier-bl.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SupplierBl } from './domain/supplier-bl';

@Injectable()
export class SupplierBlsService {
  constructor(
    private readonly supplierOrderService: SupplierOrdersService,

    // Dependencies here
    private readonly supplierBlRepository: SupplierBlRepository,
  ) {}

  async create(createSupplierBlDto: CreateSupplierBlDto) {
    // Do not remove comment below.
    // <creating-property />

    let SupplierOrderId: SupplierOrder | null | undefined = undefined;

    if (createSupplierBlDto.SupplierOrderId) {
      const SupplierOrderIdObject = await this.supplierOrderService.findById(
        createSupplierBlDto.SupplierOrderId.id,
      );
      if (!SupplierOrderIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            SupplierOrderId: 'notExists',
          },
        });
      }
      SupplierOrderId = SupplierOrderIdObject;
    } else if (createSupplierBlDto.SupplierOrderId === null) {
      SupplierOrderId = null;
    }

    return this.supplierBlRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      amountPriceHt: createSupplierBlDto.amountPriceHt,

      SuppBlScan: createSupplierBlDto.SuppBlScan,

      SupplierOrderId,

      comment: createSupplierBlDto.comment,

      receptionDate: createSupplierBlDto.receptionDate,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.supplierBlRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SupplierBl['id']) {
    return this.supplierBlRepository.findById(id);
  }

  findByIds(ids: SupplierBl['id'][]) {
    return this.supplierBlRepository.findByIds(ids);
  }

  async update(
    id: SupplierBl['id'],

    updateSupplierBlDto: UpdateSupplierBlDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let SupplierOrderId: SupplierOrder | null | undefined = undefined;

    if (updateSupplierBlDto.SupplierOrderId) {
      const SupplierOrderIdObject = await this.supplierOrderService.findById(
        updateSupplierBlDto.SupplierOrderId.id,
      );
      if (!SupplierOrderIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            SupplierOrderId: 'notExists',
          },
        });
      }
      SupplierOrderId = SupplierOrderIdObject;
    } else if (updateSupplierBlDto.SupplierOrderId === null) {
      SupplierOrderId = null;
    }

    return this.supplierBlRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      amountPriceHt: updateSupplierBlDto.amountPriceHt,

      SuppBlScan: updateSupplierBlDto.SuppBlScan,

      SupplierOrderId,

      comment: updateSupplierBlDto.comment,

      receptionDate: updateSupplierBlDto.receptionDate,
    });
  }

  remove(id: SupplierBl['id']) {
    return this.supplierBlRepository.remove(id);
  }
}
