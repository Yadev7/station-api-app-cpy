import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { DevisEntity } from '../entities/devis.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Devis } from '../../../../domain/devis';
import { DevisRepository } from '../../devis.repository';
import { DevisMapper } from '../mappers/devis.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class DevisRelationalRepository implements DevisRepository {
  constructor(
    @InjectRepository(DevisEntity)
    private readonly devisRepository: Repository<DevisEntity>,
  ) {}

  async create(data: Devis): Promise<Devis> {
    const persistenceModel = DevisMapper.toPersistence(data);
    const newEntity = await this.devisRepository.save(
      this.devisRepository.create(persistenceModel),
    );
    return DevisMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Devis[]> {
    const entities = await this.devisRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => DevisMapper.toDomain(entity));
  }

  async findById(id: Devis['id']): Promise<NullableType<Devis>> {
    const entity = await this.devisRepository.findOne({
      where: { id },
    });

    return entity ? DevisMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Devis['id'][]): Promise<Devis[]> {
    const entities = await this.devisRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => DevisMapper.toDomain(entity));
  }

  async update(id: Devis['id'], payload: Partial<Devis>): Promise<Devis> {
    const entity = await this.devisRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.devisRepository.save(
      this.devisRepository.create(
        DevisMapper.toPersistence({
          ...DevisMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return DevisMapper.toDomain(updatedEntity);
  }

  async remove(id: Devis['id']): Promise<void> {
    await this.devisRepository.delete(id);
  }
}
