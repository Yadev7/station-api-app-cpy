import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SupplierBlDetailsEntity } from '../entities/supplier-bl-details.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SupplierBlDetails } from '../../../../domain/supplier-bl-details';
import { SupplierBlDetailsRepository } from '../../supplier-bl-details.repository';
import { SupplierBlDetailsMapper } from '../mappers/supplier-bl-details.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SupplierBlDetailsRelationalRepository
  implements SupplierBlDetailsRepository
{
  constructor(
    @InjectRepository(SupplierBlDetailsEntity)
    private readonly supplierBlDetailsRepository: Repository<SupplierBlDetailsEntity>,
  ) {}

  async create(data: SupplierBlDetails): Promise<SupplierBlDetails> {
    const persistenceModel = SupplierBlDetailsMapper.toPersistence(data);
    const newEntity = await this.supplierBlDetailsRepository.save(
      this.supplierBlDetailsRepository.create(persistenceModel),
    );
    return SupplierBlDetailsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierBlDetails[]> {
    const entities = await this.supplierBlDetailsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SupplierBlDetailsMapper.toDomain(entity));
  }

  async findById(
    id: SupplierBlDetails['id'],
  ): Promise<NullableType<SupplierBlDetails>> {
    const entity = await this.supplierBlDetailsRepository.findOne({
      where: { id },
    });

    return entity ? SupplierBlDetailsMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: SupplierBlDetails['id'][],
  ): Promise<SupplierBlDetails[]> {
    const entities = await this.supplierBlDetailsRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SupplierBlDetailsMapper.toDomain(entity));
  }

  async update(
    id: SupplierBlDetails['id'],
    payload: Partial<SupplierBlDetails>,
  ): Promise<SupplierBlDetails> {
    const entity = await this.supplierBlDetailsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.supplierBlDetailsRepository.save(
      this.supplierBlDetailsRepository.create(
        SupplierBlDetailsMapper.toPersistence({
          ...SupplierBlDetailsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SupplierBlDetailsMapper.toDomain(updatedEntity);
  }

  async remove(id: SupplierBlDetails['id']): Promise<void> {
    await this.supplierBlDetailsRepository.delete(id);
  }
}
