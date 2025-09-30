import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { DepositEntity } from '../entities/deposit.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Deposit } from '../../../../domain/deposit';
import { DepositRepository } from '../../deposit.repository';
import { DepositMapper } from '../mappers/deposit.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class DepositRelationalRepository implements DepositRepository {
  constructor(
    @InjectRepository(DepositEntity)
    private readonly depositRepository: Repository<DepositEntity>,
  ) {}

  async create(data: Deposit): Promise<Deposit> {
    const persistenceModel = DepositMapper.toPersistence(data);
    const newEntity = await this.depositRepository.save(
      this.depositRepository.create(persistenceModel),
    );
    return DepositMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Deposit[]> {
    const entities = await this.depositRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => DepositMapper.toDomain(entity));
  }

  async findById(id: Deposit['id']): Promise<NullableType<Deposit>> {
    const entity = await this.depositRepository.findOne({
      where: { id },
    });

    return entity ? DepositMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Deposit['id'][]): Promise<Deposit[]> {
    const entities = await this.depositRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => DepositMapper.toDomain(entity));
  }

  async update(id: Deposit['id'], payload: Partial<Deposit>): Promise<Deposit> {
    const entity = await this.depositRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.depositRepository.save(
      this.depositRepository.create(
        DepositMapper.toPersistence({
          ...DepositMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return DepositMapper.toDomain(updatedEntity);
  }

  async remove(id: Deposit['id']): Promise<void> {
    await this.depositRepository.delete(id);
  }
}
