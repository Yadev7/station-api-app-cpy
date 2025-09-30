import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { NozzleEntity } from '../entities/nozzle.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Nozzle } from '../../../../domain/nozzle';
import { NozzleRepository } from '../../nozzle.repository';
import { NozzleMapper } from '../mappers/nozzle.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class NozzleRelationalRepository implements NozzleRepository {
  constructor(
    @InjectRepository(NozzleEntity)
    private readonly nozzleRepository: Repository<NozzleEntity>,
  ) {}

  async create(data: Nozzle): Promise<Nozzle> {
    const persistenceModel = NozzleMapper.toPersistence(data);
    const newEntity = await this.nozzleRepository.save(
      this.nozzleRepository.create(persistenceModel),
    );
    return NozzleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Nozzle[]> {
    const entities = await this.nozzleRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => NozzleMapper.toDomain(entity));
  }

  async findById(id: Nozzle['id']): Promise<NullableType<Nozzle>> {
    const entity = await this.nozzleRepository.findOne({
      where: { id },
    });

    return entity ? NozzleMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Nozzle['id'][]): Promise<Nozzle[]> {
    const entities = await this.nozzleRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => NozzleMapper.toDomain(entity));
  }

  async update(id: Nozzle['id'], payload: Partial<Nozzle>): Promise<Nozzle> {
    const entity = await this.nozzleRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.nozzleRepository.save(
      this.nozzleRepository.create(
        NozzleMapper.toPersistence({
          ...NozzleMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return NozzleMapper.toDomain(updatedEntity);
  }

  async remove(id: Nozzle['id']): Promise<void> {
    await this.nozzleRepository.delete(id);
  }
}
