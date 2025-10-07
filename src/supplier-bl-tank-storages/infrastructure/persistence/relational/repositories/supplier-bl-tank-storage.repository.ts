import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SupplierBlTankStorageEntity } from '../entities/supplier-bl-tank-storage.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SupplierBlTankStorage } from '../../../../domain/supplier-bl-tank-storage';
import { SupplierBlTankStorageRepository } from '../../supplier-bl-tank-storage.repository';
import { SupplierBlTankStorageMapper } from '../mappers/supplier-bl-tank-storage.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SupplierBlTankStorageRelationalRepository
  implements SupplierBlTankStorageRepository
{
  constructor(
    @InjectRepository(SupplierBlTankStorageEntity)
    private readonly supplierBlTankStorageRepository: Repository<SupplierBlTankStorageEntity>,
  ) {}

  async create(data: SupplierBlTankStorage): Promise<SupplierBlTankStorage> {
    const persistenceModel = SupplierBlTankStorageMapper.toPersistence(data);
    const newEntity = await this.supplierBlTankStorageRepository.save(
      this.supplierBlTankStorageRepository.create(persistenceModel),
    );
    return SupplierBlTankStorageMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierBlTankStorage[]> {
    const entities = await this.supplierBlTankStorageRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) =>
      SupplierBlTankStorageMapper.toDomain(entity),
    );
  }

  async findById(
    id: SupplierBlTankStorage['id'],
  ): Promise<NullableType<SupplierBlTankStorage>> {
    const entity = await this.supplierBlTankStorageRepository.findOne({
      where: { id },
    });

    return entity ? SupplierBlTankStorageMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: SupplierBlTankStorage['id'][],
  ): Promise<SupplierBlTankStorage[]> {
    const entities = await this.supplierBlTankStorageRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) =>
      SupplierBlTankStorageMapper.toDomain(entity),
    );
  }

  async update(
    id: SupplierBlTankStorage['id'],
    payload: Partial<SupplierBlTankStorage>,
  ): Promise<SupplierBlTankStorage> {
    const entity = await this.supplierBlTankStorageRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.supplierBlTankStorageRepository.save(
      this.supplierBlTankStorageRepository.create(
        SupplierBlTankStorageMapper.toPersistence({
          ...SupplierBlTankStorageMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SupplierBlTankStorageMapper.toDomain(updatedEntity);
  }

  async remove(id: SupplierBlTankStorage['id']): Promise<void> {
    await this.supplierBlTankStorageRepository.delete(id);
  }
}
