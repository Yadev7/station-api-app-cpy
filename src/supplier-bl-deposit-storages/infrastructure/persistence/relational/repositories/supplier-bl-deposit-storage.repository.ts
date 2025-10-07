import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SupplierBlDepositStorageEntity } from '../entities/supplier-bl-deposit-storage.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SupplierBlDepositStorage } from '../../../../domain/supplier-bl-deposit-storage';
import { SupplierBlDepositStorageRepository } from '../../supplier-bl-deposit-storage.repository';
import { SupplierBlDepositStorageMapper } from '../mappers/supplier-bl-deposit-storage.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SupplierBlDepositStorageRelationalRepository
  implements SupplierBlDepositStorageRepository
{
  constructor(
    @InjectRepository(SupplierBlDepositStorageEntity)
    private readonly supplierBlDepositStorageRepository: Repository<SupplierBlDepositStorageEntity>,
  ) {}

  async create(
    data: SupplierBlDepositStorage,
  ): Promise<SupplierBlDepositStorage> {
    const persistenceModel = SupplierBlDepositStorageMapper.toPersistence(data);
    const newEntity = await this.supplierBlDepositStorageRepository.save(
      this.supplierBlDepositStorageRepository.create(persistenceModel),
    );
    return SupplierBlDepositStorageMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierBlDepositStorage[]> {
    const entities = await this.supplierBlDepositStorageRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) =>
      SupplierBlDepositStorageMapper.toDomain(entity),
    );
  }

  async findById(
    id: SupplierBlDepositStorage['id'],
  ): Promise<NullableType<SupplierBlDepositStorage>> {
    const entity = await this.supplierBlDepositStorageRepository.findOne({
      where: { id },
    });

    return entity ? SupplierBlDepositStorageMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: SupplierBlDepositStorage['id'][],
  ): Promise<SupplierBlDepositStorage[]> {
    const entities = await this.supplierBlDepositStorageRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) =>
      SupplierBlDepositStorageMapper.toDomain(entity),
    );
  }

  async update(
    id: SupplierBlDepositStorage['id'],
    payload: Partial<SupplierBlDepositStorage>,
  ): Promise<SupplierBlDepositStorage> {
    const entity = await this.supplierBlDepositStorageRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.supplierBlDepositStorageRepository.save(
      this.supplierBlDepositStorageRepository.create(
        SupplierBlDepositStorageMapper.toPersistence({
          ...SupplierBlDepositStorageMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SupplierBlDepositStorageMapper.toDomain(updatedEntity);
  }

  async remove(id: SupplierBlDepositStorage['id']): Promise<void> {
    await this.supplierBlDepositStorageRepository.delete(id);
  }
}
