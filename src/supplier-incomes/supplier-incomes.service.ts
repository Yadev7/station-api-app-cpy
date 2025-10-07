import { SupplierBlsService } from '../supplier-bls/supplier-bls.service';
import { SupplierBl } from '../supplier-bls/domain/supplier-bl';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateSupplierIncomeDto } from './dto/create-supplier-income.dto';
import { UpdateSupplierIncomeDto } from './dto/update-supplier-income.dto';
import { SupplierIncomeRepository } from './infrastructure/persistence/supplier-income.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SupplierIncome } from './domain/supplier-income';

@Injectable()
export class SupplierIncomesService {
  constructor(
    private readonly supplierBlService: SupplierBlsService,

    // Dependencies here
    private readonly supplierIncomeRepository: SupplierIncomeRepository,
  ) {}

  async create(createSupplierIncomeDto: CreateSupplierIncomeDto) {
    // Do not remove comment below.
    // <creating-property />
    let SupplierBlId: SupplierBl | null | undefined = undefined;

    if (createSupplierIncomeDto.SupplierBlId) {
      const SupplierBlIdObject = await this.supplierBlService.findById(
        createSupplierIncomeDto.SupplierBlId.id,
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
    } else if (createSupplierIncomeDto.SupplierBlId === null) {
      SupplierBlId = null;
    }

    return this.supplierIncomeRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      SupplierBlId,

      comment: createSupplierIncomeDto.comment,

      IncomeScan: createSupplierIncomeDto.IncomeScan,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.supplierIncomeRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SupplierIncome['id']) {
    return this.supplierIncomeRepository.findById(id);
  }

  findByIds(ids: SupplierIncome['id'][]) {
    return this.supplierIncomeRepository.findByIds(ids);
  }

  async update(
    id: SupplierIncome['id'],

    updateSupplierIncomeDto: UpdateSupplierIncomeDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let SupplierBlId: SupplierBl | null | undefined = undefined;

    if (updateSupplierIncomeDto.SupplierBlId) {
      const SupplierBlIdObject = await this.supplierBlService.findById(
        updateSupplierIncomeDto.SupplierBlId.id,
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
    } else if (updateSupplierIncomeDto.SupplierBlId === null) {
      SupplierBlId = null;
    }

    return this.supplierIncomeRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      SupplierBlId,

      comment: updateSupplierIncomeDto.comment,

      IncomeScan: updateSupplierIncomeDto.IncomeScan,
    });
  }

  remove(id: SupplierIncome['id']) {
    return this.supplierIncomeRepository.remove(id);
  }
}
