import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SupplierBlEntity } from '../entities/supplier-bl.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SupplierBl } from '../../../../domain/supplier-bl';
import { SupplierBlRepository } from '../../supplier-bl.repository';
import { SupplierBlMapper } from '../mappers/supplier-bl.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SupplierBlRelationalRepository implements SupplierBlRepository {
  constructor(
    @InjectRepository(SupplierBlEntity)
    private readonly supplierBlRepository: Repository<SupplierBlEntity>,
  ) {}

  async create(data: SupplierBl): Promise<SupplierBl> {
    const persistenceModel = SupplierBlMapper.toPersistence(data);
    const newEntity = await this.supplierBlRepository.save(
      this.supplierBlRepository.create(persistenceModel),
    );
    return SupplierBlMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierBl[]> {
    const entities = await this.supplierBlRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SupplierBlMapper.toDomain(entity));
  }

  async findById(id: SupplierBl['id']): Promise<NullableType<SupplierBl>> {
    const entity = await this.supplierBlRepository.findOne({
      where: { id },
    });

    return entity ? SupplierBlMapper.toDomain(entity) : null;
  }

  async findByIds(ids: SupplierBl['id'][]): Promise<SupplierBl[]> {
    const entities = await this.supplierBlRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SupplierBlMapper.toDomain(entity));
  }

  async update(
    id: SupplierBl['id'],
    payload: Partial<SupplierBl>,
  ): Promise<SupplierBl> {
    const entity = await this.supplierBlRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.supplierBlRepository.save(
      this.supplierBlRepository.create(
        SupplierBlMapper.toPersistence({
          ...SupplierBlMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SupplierBlMapper.toDomain(updatedEntity);
  }

  async remove(id: SupplierBl['id']): Promise<void> {
    await this.supplierBlRepository.delete(id);
  }
}
