import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SupplierOrderEntity } from '../entities/supplier-order.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SupplierOrder } from '../../../../domain/supplier-order';
import { SupplierOrderRepository } from '../../supplier-order.repository';
import { SupplierOrderMapper } from '../mappers/supplier-order.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SupplierOrderRelationalRepository
  implements SupplierOrderRepository
{
  constructor(
    @InjectRepository(SupplierOrderEntity)
    private readonly supplierOrderRepository: Repository<SupplierOrderEntity>,
  ) {}

  async create(data: SupplierOrder): Promise<SupplierOrder> {
    const persistenceModel = SupplierOrderMapper.toPersistence(data);
    const newEntity = await this.supplierOrderRepository.save(
      this.supplierOrderRepository.create(persistenceModel),
    );
    return SupplierOrderMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierOrder[]> {
    const entities = await this.supplierOrderRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SupplierOrderMapper.toDomain(entity));
  }

  async findById(
    id: SupplierOrder['id'],
  ): Promise<NullableType<SupplierOrder>> {
    const entity = await this.supplierOrderRepository.findOne({
      where: { id },
    });

    return entity ? SupplierOrderMapper.toDomain(entity) : null;
  }

  async findByIds(ids: SupplierOrder['id'][]): Promise<SupplierOrder[]> {
    const entities = await this.supplierOrderRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SupplierOrderMapper.toDomain(entity));
  }

  async update(
    id: SupplierOrder['id'],
    payload: Partial<SupplierOrder>,
  ): Promise<SupplierOrder> {
    const entity = await this.supplierOrderRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.supplierOrderRepository.save(
      this.supplierOrderRepository.create(
        SupplierOrderMapper.toPersistence({
          ...SupplierOrderMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SupplierOrderMapper.toDomain(updatedEntity);
  }

  async remove(id: SupplierOrder['id']): Promise<void> {
    await this.supplierOrderRepository.delete(id);
  }
}
