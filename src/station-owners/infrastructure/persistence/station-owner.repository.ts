import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { StationOwner } from '../../domain/station-owner';

export abstract class StationOwnerRepository {
  abstract create(
    data: Omit<StationOwner, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<StationOwner>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<StationOwner[]>;

  abstract findById(
    id: StationOwner['id'],
  ): Promise<NullableType<StationOwner>>;

  abstract findByIds(ids: StationOwner['id'][]): Promise<StationOwner[]>;

  abstract update(
    id: StationOwner['id'],
    payload: DeepPartial<StationOwner>,
  ): Promise<StationOwner | null>;

  abstract remove(id: StationOwner['id']): Promise<void>;
}
