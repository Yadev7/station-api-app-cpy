import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Tank } from '../../domain/tank';

export abstract class TankRepository {
  abstract create(
    data: Omit<Tank, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Tank>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Tank[]>;

  abstract findById(id: Tank['id']): Promise<NullableType<Tank>>;

  abstract findByIds(ids: Tank['id'][]): Promise<Tank[]>;

  abstract update(
    id: Tank['id'],
    payload: DeepPartial<Tank>,
  ): Promise<Tank | null>;

  abstract remove(id: Tank['id']): Promise<void>;
}
