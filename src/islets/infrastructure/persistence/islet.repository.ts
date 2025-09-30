import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Islet } from '../../domain/islet';

export abstract class IsletRepository {
  abstract create(
    data: Omit<Islet, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Islet>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Islet[]>;

  abstract findById(id: Islet['id']): Promise<NullableType<Islet>>;

  abstract findByIds(ids: Islet['id'][]): Promise<Islet[]>;

  abstract update(
    id: Islet['id'],
    payload: DeepPartial<Islet>,
  ): Promise<Islet | null>;

  abstract remove(id: Islet['id']): Promise<void>;
}
