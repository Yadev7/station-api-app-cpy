import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SupplierPaiementDetailsEntity } from '../entities/supplier-paiement-details.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SupplierPaiementDetails } from '../../../../domain/supplier-paiement-details';
import { SupplierPaiementDetailsRepository } from '../../supplier-paiement-details.repository';
import { SupplierPaiementDetailsMapper } from '../mappers/supplier-paiement-details.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SupplierPaiementDetailsRelationalRepository
  implements SupplierPaiementDetailsRepository
{
  constructor(
    @InjectRepository(SupplierPaiementDetailsEntity)
    private readonly supplierPaiementDetailsRepository: Repository<SupplierPaiementDetailsEntity>,
  ) {}

  async create(
    data: SupplierPaiementDetails,
  ): Promise<SupplierPaiementDetails> {
    const persistenceModel = SupplierPaiementDetailsMapper.toPersistence(data);
    const newEntity = await this.supplierPaiementDetailsRepository.save(
      this.supplierPaiementDetailsRepository.create(persistenceModel),
    );
    return SupplierPaiementDetailsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierPaiementDetails[]> {
    const entities = await this.supplierPaiementDetailsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) =>
      SupplierPaiementDetailsMapper.toDomain(entity),
    );
  }

  async findById(
    id: SupplierPaiementDetails['id'],
  ): Promise<NullableType<SupplierPaiementDetails>> {
    const entity = await this.supplierPaiementDetailsRepository.findOne({
      where: { id },
    });

    return entity ? SupplierPaiementDetailsMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: SupplierPaiementDetails['id'][],
  ): Promise<SupplierPaiementDetails[]> {
    const entities = await this.supplierPaiementDetailsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) =>
      SupplierPaiementDetailsMapper.toDomain(entity),
    );
  }

  async update(
    id: SupplierPaiementDetails['id'],
    payload: Partial<SupplierPaiementDetails>,
  ): Promise<SupplierPaiementDetails> {
    const entity = await this.supplierPaiementDetailsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.supplierPaiementDetailsRepository.save(
      this.supplierPaiementDetailsRepository.create(
        SupplierPaiementDetailsMapper.toPersistence({
          ...SupplierPaiementDetailsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SupplierPaiementDetailsMapper.toDomain(updatedEntity);
  }

  async remove(id: SupplierPaiementDetails['id']): Promise<void> {
    await this.supplierPaiementDetailsRepository.delete(id);
  }
}
