import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { IsletEntity } from '../entities/islet.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Islet } from '../../../../domain/islet';
import { IsletRepository } from '../../islet.repository';
import { IsletMapper } from '../mappers/islet.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class IsletRelationalRepository implements IsletRepository {
  constructor(
    @InjectRepository(IsletEntity)
    private readonly isletRepository: Repository<IsletEntity>,
  ) {}

  async create(data: Islet): Promise<Islet> {
    const persistenceModel = IsletMapper.toPersistence(data);
    const newEntity = await this.isletRepository.save(
      this.isletRepository.create(persistenceModel),
    );
    return IsletMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Islet[]> {
    const entities = await this.isletRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => IsletMapper.toDomain(entity));
  }

  async findById(id: Islet['id']): Promise<NullableType<Islet>> {
    const entity = await this.isletRepository.findOne({
      where: { id },
    });

    return entity ? IsletMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Islet['id'][]): Promise<Islet[]> {
    const entities = await this.isletRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => IsletMapper.toDomain(entity));
  }

  async update(id: Islet['id'], payload: Partial<Islet>): Promise<Islet> {
    const entity = await this.isletRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.isletRepository.save(
      this.isletRepository.create(
        IsletMapper.toPersistence({
          ...IsletMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return IsletMapper.toDomain(updatedEntity);
  }

  async remove(id: Islet['id']): Promise<void> {
    await this.isletRepository.delete(id);
  }
}
