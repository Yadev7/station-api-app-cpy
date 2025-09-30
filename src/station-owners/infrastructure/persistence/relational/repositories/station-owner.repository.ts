import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { StationOwnerEntity } from '../entities/station-owner.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { StationOwner } from '../../../../domain/station-owner';
import { StationOwnerRepository } from '../../station-owner.repository';
import { StationOwnerMapper } from '../mappers/station-owner.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class StationOwnerRelationalRepository
  implements StationOwnerRepository
{
  constructor(
    @InjectRepository(StationOwnerEntity)
    private readonly stationOwnerRepository: Repository<StationOwnerEntity>,
  ) {}

  async create(data: StationOwner): Promise<StationOwner> {
    const persistenceModel = StationOwnerMapper.toPersistence(data);
    const newEntity = await this.stationOwnerRepository.save(
      this.stationOwnerRepository.create(persistenceModel),
    );
    return StationOwnerMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<StationOwner[]> {
    const entities = await this.stationOwnerRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => StationOwnerMapper.toDomain(entity));
  }

  async findById(id: StationOwner['id']): Promise<NullableType<StationOwner>> {
    const entity = await this.stationOwnerRepository.findOne({
      where: { id },
    });

    return entity ? StationOwnerMapper.toDomain(entity) : null;
  }

  async findByIds(ids: StationOwner['id'][]): Promise<StationOwner[]> {
    const entities = await this.stationOwnerRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => StationOwnerMapper.toDomain(entity));
  }

  async update(
    id: StationOwner['id'],
    payload: Partial<StationOwner>,
  ): Promise<StationOwner> {
    const entity = await this.stationOwnerRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.stationOwnerRepository.save(
      this.stationOwnerRepository.create(
        StationOwnerMapper.toPersistence({
          ...StationOwnerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return StationOwnerMapper.toDomain(updatedEntity);
  }

  async remove(id: StationOwner['id']): Promise<void> {
    await this.stationOwnerRepository.delete(id);
  }
}
