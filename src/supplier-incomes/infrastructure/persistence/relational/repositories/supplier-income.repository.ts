import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SupplierIncomeEntity } from '../entities/supplier-income.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SupplierIncome } from '../../../../domain/supplier-income';
import { SupplierIncomeRepository } from '../../supplier-income.repository';
import { SupplierIncomeMapper } from '../mappers/supplier-income.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SupplierIncomeRelationalRepository
  implements SupplierIncomeRepository
{
  constructor(
    @InjectRepository(SupplierIncomeEntity)
    private readonly supplierIncomeRepository: Repository<SupplierIncomeEntity>,
  ) {}

  async create(data: SupplierIncome): Promise<SupplierIncome> {
    const persistenceModel = SupplierIncomeMapper.toPersistence(data);
    const newEntity = await this.supplierIncomeRepository.save(
      this.supplierIncomeRepository.create(persistenceModel),
    );
    return SupplierIncomeMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierIncome[]> {
    const entities = await this.supplierIncomeRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SupplierIncomeMapper.toDomain(entity));
  }

  async findById(
    id: SupplierIncome['id'],
  ): Promise<NullableType<SupplierIncome>> {
    const entity = await this.supplierIncomeRepository.findOne({
      where: { id },
    });

    return entity ? SupplierIncomeMapper.toDomain(entity) : null;
  }

  async findByIds(ids: SupplierIncome['id'][]): Promise<SupplierIncome[]> {
    const entities = await this.supplierIncomeRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SupplierIncomeMapper.toDomain(entity));
  }

  async update(
    id: SupplierIncome['id'],
    payload: Partial<SupplierIncome>,
  ): Promise<SupplierIncome> {
    const entity = await this.supplierIncomeRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.supplierIncomeRepository.save(
      this.supplierIncomeRepository.create(
        SupplierIncomeMapper.toPersistence({
          ...SupplierIncomeMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SupplierIncomeMapper.toDomain(updatedEntity);
  }

  async remove(id: SupplierIncome['id']): Promise<void> {
    await this.supplierIncomeRepository.delete(id);
  }
}
