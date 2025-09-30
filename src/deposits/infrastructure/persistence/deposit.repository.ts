import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Deposit } from '../../domain/deposit';

export abstract class DepositRepository {
  abstract create(
    data: Omit<Deposit, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Deposit>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Deposit[]>;

  abstract findById(id: Deposit['id']): Promise<NullableType<Deposit>>;

  abstract findByIds(ids: Deposit['id'][]): Promise<Deposit[]>;

  abstract update(
    id: Deposit['id'],
    payload: DeepPartial<Deposit>,
  ): Promise<Deposit | null>;

  abstract remove(id: Deposit['id']): Promise<void>;
}
