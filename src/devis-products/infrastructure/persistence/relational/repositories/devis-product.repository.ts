import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { DevisProductEntity } from '../entities/devis-product.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { DevisProduct } from '../../../../domain/devis-product';
import { DevisProductRepository } from '../../devis-product.repository';
import { DevisProductMapper } from '../mappers/devis-product.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class DevisProductRelationalRepository
  implements DevisProductRepository
{
  constructor(
    @InjectRepository(DevisProductEntity)
    private readonly devisProductRepository: Repository<DevisProductEntity>,
  ) {}

  async create(data: DevisProduct): Promise<DevisProduct> {
    const persistenceModel = DevisProductMapper.toPersistence(data);
    const newEntity = await this.devisProductRepository.save(
      this.devisProductRepository.create(persistenceModel),
    );
    return DevisProductMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<DevisProduct[]> {
    const entities = await this.devisProductRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => DevisProductMapper.toDomain(entity));
  }

  async findById(id: DevisProduct['id']): Promise<NullableType<DevisProduct>> {
    const entity = await this.devisProductRepository.findOne({
      where: { id },
    });

    return entity ? DevisProductMapper.toDomain(entity) : null;
  }

  async findByIds(ids: DevisProduct['id'][]): Promise<DevisProduct[]> {
    const entities = await this.devisProductRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => DevisProductMapper.toDomain(entity));
  }

  async update(
    id: DevisProduct['id'],
    payload: Partial<DevisProduct>,
  ): Promise<DevisProduct> {
    const entity = await this.devisProductRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.devisProductRepository.save(
      this.devisProductRepository.create(
        DevisProductMapper.toPersistence({
          ...DevisProductMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return DevisProductMapper.toDomain(updatedEntity);
  }

  async remove(id: DevisProduct['id']): Promise<void> {
    await this.devisProductRepository.delete(id);
  }
}
