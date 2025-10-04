import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SupplierOrderDetailsEntity } from '../entities/supplier-order-details.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SupplierOrderDetails } from '../../../../domain/supplier-order-details';
import { SupplierOrderDetailsRepository } from '../../supplier-order-details.repository';
import { SupplierOrderDetailsMapper } from '../mappers/supplier-order-details.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SupplierOrderDetailsRelationalRepository
  implements SupplierOrderDetailsRepository
{
  constructor(
    @InjectRepository(SupplierOrderDetailsEntity)
    private readonly supplierOrderDetailsRepository: Repository<SupplierOrderDetailsEntity>,
  ) {}

  async create(data: SupplierOrderDetails): Promise<SupplierOrderDetails> {
    const persistenceModel = SupplierOrderDetailsMapper.toPersistence(data);
    const newEntity = await this.supplierOrderDetailsRepository.save(
      this.supplierOrderDetailsRepository.create(persistenceModel),
    );
    return SupplierOrderDetailsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierOrderDetails[]> {
    const entities = await this.supplierOrderDetailsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) =>
      SupplierOrderDetailsMapper.toDomain(entity),
    );
  }

  async findById(
    id: SupplierOrderDetails['id'],
  ): Promise<NullableType<SupplierOrderDetails>> {
    const entity = await this.supplierOrderDetailsRepository.findOne({
      where: { id },
    });

    return entity ? SupplierOrderDetailsMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: SupplierOrderDetails['id'][],
  ): Promise<SupplierOrderDetails[]> {
    const entities = await this.supplierOrderDetailsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) =>
      SupplierOrderDetailsMapper.toDomain(entity),
    );
  }

  async update(
    id: SupplierOrderDetails['id'],
    payload: Partial<SupplierOrderDetails>,
  ): Promise<SupplierOrderDetails> {
    const entity = await this.supplierOrderDetailsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.supplierOrderDetailsRepository.save(
      this.supplierOrderDetailsRepository.create(
        SupplierOrderDetailsMapper.toPersistence({
          ...SupplierOrderDetailsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SupplierOrderDetailsMapper.toDomain(updatedEntity);
  }

  async remove(id: SupplierOrderDetails['id']): Promise<void> {
    await this.supplierOrderDetailsRepository.delete(id);
  }
}
