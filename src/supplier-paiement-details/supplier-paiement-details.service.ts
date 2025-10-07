import { SupplierIncomesService } from '../supplier-incomes/supplier-incomes.service';
import { SupplierIncome } from '../supplier-incomes/domain/supplier-income';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateSupplierPaiementDetailsDto } from './dto/create-supplier-paiement-details.dto';
import { UpdateSupplierPaiementDetailsDto } from './dto/update-supplier-paiement-details.dto';
import { SupplierPaiementDetailsRepository } from './infrastructure/persistence/supplier-paiement-details.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SupplierPaiementDetails } from './domain/supplier-paiement-details';

@Injectable()
export class SupplierPaiementDetailsService {
  constructor(
    private readonly supplierIncomeService: SupplierIncomesService,

    // Dependencies here
    private readonly supplierPaiementDetailsRepository: SupplierPaiementDetailsRepository,
  ) {}

  async create(
    createSupplierPaiementDetailsDto: CreateSupplierPaiementDetailsDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    let SupplierIncomeId: SupplierIncome | null | undefined = undefined;

    if (createSupplierPaiementDetailsDto.SupplierIncomeId) {
      const SupplierIncomeIdObject = await this.supplierIncomeService.findById(
        createSupplierPaiementDetailsDto.SupplierIncomeId.id,
      );
      if (!SupplierIncomeIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            SupplierIncomeId: 'notExists',
          },
        });
      }
      SupplierIncomeId = SupplierIncomeIdObject;
    } else if (createSupplierPaiementDetailsDto.SupplierIncomeId === null) {
      SupplierIncomeId = null;
    }

    return this.supplierPaiementDetailsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      paiementAmount: createSupplierPaiementDetailsDto.paiementAmount,

      SupplierIncomeId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.supplierPaiementDetailsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SupplierPaiementDetails['id']) {
    return this.supplierPaiementDetailsRepository.findById(id);
  }

  findByIds(ids: SupplierPaiementDetails['id'][]) {
    return this.supplierPaiementDetailsRepository.findByIds(ids);
  }

  async update(
    id: SupplierPaiementDetails['id'],

    updateSupplierPaiementDetailsDto: UpdateSupplierPaiementDetailsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let SupplierIncomeId: SupplierIncome | null | undefined = undefined;

    if (updateSupplierPaiementDetailsDto.SupplierIncomeId) {
      const SupplierIncomeIdObject = await this.supplierIncomeService.findById(
        updateSupplierPaiementDetailsDto.SupplierIncomeId.id,
      );
      if (!SupplierIncomeIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            SupplierIncomeId: 'notExists',
          },
        });
      }
      SupplierIncomeId = SupplierIncomeIdObject;
    } else if (updateSupplierPaiementDetailsDto.SupplierIncomeId === null) {
      SupplierIncomeId = null;
    }

    return this.supplierPaiementDetailsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      paiementAmount: updateSupplierPaiementDetailsDto.paiementAmount,

      SupplierIncomeId,
    });
  }

  remove(id: SupplierPaiementDetails['id']) {
    return this.supplierPaiementDetailsRepository.remove(id);
  }
}
