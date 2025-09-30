import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Dispenser } from '../../domain/dispenser';

export abstract class DispenserRepository {
  abstract create(
    data: Omit<Dispenser, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Dispenser>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Dispenser[]>;

  abstract findById(id: Dispenser['id']): Promise<NullableType<Dispenser>>;

  abstract findByIds(ids: Dispenser['id'][]): Promise<Dispenser[]>;

  abstract update(
    id: Dispenser['id'],
    payload: DeepPartial<Dispenser>,
  ): Promise<Dispenser | null>;

  abstract remove(id: Dispenser['id']): Promise<void>;
}
