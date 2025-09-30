import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { TankEntity } from '../entities/tank.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Tank } from '../../../../domain/tank';
import { TankRepository } from '../../tank.repository';
import { TankMapper } from '../mappers/tank.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class TankRelationalRepository implements TankRepository {
  constructor(
    @InjectRepository(TankEntity)
    private readonly tankRepository: Repository<TankEntity>,
  ) {}

  async create(data: Tank): Promise<Tank> {
    const persistenceModel = TankMapper.toPersistence(data);
    const newEntity = await this.tankRepository.save(
      this.tankRepository.create(persistenceModel),
    );
    return TankMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Tank[]> {
    const entities = await this.tankRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => TankMapper.toDomain(entity));
  }

  async findById(id: Tank['id']): Promise<NullableType<Tank>> {
    const entity = await this.tankRepository.findOne({
      where: { id },
    });

    return entity ? TankMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Tank['id'][]): Promise<Tank[]> {
    const entities = await this.tankRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => TankMapper.toDomain(entity));
  }

  async update(id: Tank['id'], payload: Partial<Tank>): Promise<Tank> {
    const entity = await this.tankRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.tankRepository.save(
      this.tankRepository.create(
        TankMapper.toPersistence({
          ...TankMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TankMapper.toDomain(updatedEntity);
  }

  async remove(id: Tank['id']): Promise<void> {
    await this.tankRepository.delete(id);
  }
}
