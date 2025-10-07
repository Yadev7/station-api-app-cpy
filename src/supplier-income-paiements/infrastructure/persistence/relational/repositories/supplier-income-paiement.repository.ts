import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SupplierIncomePaiementEntity } from '../entities/supplier-income-paiement.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SupplierIncomePaiement } from '../../../../domain/supplier-income-paiement';
import { SupplierIncomePaiementRepository } from '../../supplier-income-paiement.repository';
import { SupplierIncomePaiementMapper } from '../mappers/supplier-income-paiement.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SupplierIncomePaiementRelationalRepository
  implements SupplierIncomePaiementRepository
{
  constructor(
    @InjectRepository(SupplierIncomePaiementEntity)
    private readonly supplierIncomePaiementRepository: Repository<SupplierIncomePaiementEntity>,
  ) {}

  async create(data: SupplierIncomePaiement): Promise<SupplierIncomePaiement> {
    const persistenceModel = SupplierIncomePaiementMapper.toPersistence(data);
    const newEntity = await this.supplierIncomePaiementRepository.save(
      this.supplierIncomePaiementRepository.create(persistenceModel),
    );
    return SupplierIncomePaiementMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierIncomePaiement[]> {
    const entities = await this.supplierIncomePaiementRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) =>
      SupplierIncomePaiementMapper.toDomain(entity),
    );
  }

  async findById(
    id: SupplierIncomePaiement['id'],
  ): Promise<NullableType<SupplierIncomePaiement>> {
    const entity = await this.supplierIncomePaiementRepository.findOne({
      where: { id },
    });

    return entity ? SupplierIncomePaiementMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: SupplierIncomePaiement['id'][],
  ): Promise<SupplierIncomePaiement[]> {
    const entities = await this.supplierIncomePaiementRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) =>
      SupplierIncomePaiementMapper.toDomain(entity),
    );
  }

  async update(
    id: SupplierIncomePaiement['id'],
    payload: Partial<SupplierIncomePaiement>,
  ): Promise<SupplierIncomePaiement> {
    const entity = await this.supplierIncomePaiementRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.supplierIncomePaiementRepository.save(
      this.supplierIncomePaiementRepository.create(
        SupplierIncomePaiementMapper.toPersistence({
          ...SupplierIncomePaiementMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SupplierIncomePaiementMapper.toDomain(updatedEntity);
  }

  async remove(id: SupplierIncomePaiement['id']): Promise<void> {
    await this.supplierIncomePaiementRepository.delete(id);
  }
}
