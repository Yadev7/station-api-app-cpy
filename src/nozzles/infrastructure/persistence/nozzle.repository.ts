import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Nozzle } from '../../domain/nozzle';

export abstract class NozzleRepository {
  abstract create(
    data: Omit<Nozzle, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Nozzle>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Nozzle[]>;

  abstract findById(id: Nozzle['id']): Promise<NullableType<Nozzle>>;

  abstract findByIds(ids: Nozzle['id'][]): Promise<Nozzle[]>;

  abstract update(
    id: Nozzle['id'],
    payload: DeepPartial<Nozzle>,
  ): Promise<Nozzle | null>;

  abstract remove(id: Nozzle['id']): Promise<void>;
}
