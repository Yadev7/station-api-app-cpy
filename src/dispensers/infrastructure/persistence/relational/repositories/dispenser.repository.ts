import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { DispenserEntity } from '../entities/dispenser.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Dispenser } from '../../../../domain/dispenser';
import { DispenserRepository } from '../../dispenser.repository';
import { DispenserMapper } from '../mappers/dispenser.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class DispenserRelationalRepository implements DispenserRepository {
  constructor(
    @InjectRepository(DispenserEntity)
    private readonly dispenserRepository: Repository<DispenserEntity>,
  ) {}

  async create(data: Dispenser): Promise<Dispenser> {
    const persistenceModel = DispenserMapper.toPersistence(data);
    const newEntity = await this.dispenserRepository.save(
      this.dispenserRepository.create(persistenceModel),
    );
    return DispenserMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Dispenser[]> {
    const entities = await this.dispenserRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => DispenserMapper.toDomain(entity));
  }

  async findById(id: Dispenser['id']): Promise<NullableType<Dispenser>> {
    const entity = await this.dispenserRepository.findOne({
      where: { id },
    });

    return entity ? DispenserMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Dispenser['id'][]): Promise<Dispenser[]> {
    const entities = await this.dispenserRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => DispenserMapper.toDomain(entity));
  }

  async update(
    id: Dispenser['id'],
    payload: Partial<Dispenser>,
  ): Promise<Dispenser> {
    const entity = await this.dispenserRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.dispenserRepository.save(
      this.dispenserRepository.create(
        DispenserMapper.toPersistence({
          ...DispenserMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return DispenserMapper.toDomain(updatedEntity);
  }

  async remove(id: Dispenser['id']): Promise<void> {
    await this.dispenserRepository.delete(id);
  }
}
