import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateSupplierIncomePaiementDto } from './dto/create-supplier-income-paiement.dto';
import { UpdateSupplierIncomePaiementDto } from './dto/update-supplier-income-paiement.dto';
import { SupplierIncomePaiementRepository } from './infrastructure/persistence/supplier-income-paiement.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SupplierIncomePaiement } from './domain/supplier-income-paiement';

@Injectable()
export class SupplierIncomePaiementsService {
  constructor(
    // Dependencies here
    private readonly supplierIncomePaiementRepository: SupplierIncomePaiementRepository,
  ) {}

  async create(
    createSupplierIncomePaiementDto: CreateSupplierIncomePaiementDto,
  ) {
    // Do not remove comment below.
    // <creating-property />

    return this.supplierIncomePaiementRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      paiementType: createSupplierIncomePaiementDto.paiementType,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.supplierIncomePaiementRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SupplierIncomePaiement['id']) {
    return this.supplierIncomePaiementRepository.findById(id);
  }

  findByIds(ids: SupplierIncomePaiement['id'][]) {
    return this.supplierIncomePaiementRepository.findByIds(ids);
  }

  async update(
    id: SupplierIncomePaiement['id'],

    updateSupplierIncomePaiementDto: UpdateSupplierIncomePaiementDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.supplierIncomePaiementRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      paiementType: updateSupplierIncomePaiementDto.paiementType,
    });
  }

  remove(id: SupplierIncomePaiement['id']) {
    return this.supplierIncomePaiementRepository.remove(id);
  }
}
