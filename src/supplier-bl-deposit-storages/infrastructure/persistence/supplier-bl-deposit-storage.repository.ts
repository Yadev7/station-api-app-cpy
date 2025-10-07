import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SupplierBlDepositStorage } from '../../domain/supplier-bl-deposit-storage';

export abstract class SupplierBlDepositStorageRepository {
  abstract create(
    data: Omit<SupplierBlDepositStorage, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SupplierBlDepositStorage>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierBlDepositStorage[]>;

  abstract findById(
    id: SupplierBlDepositStorage['id'],
  ): Promise<NullableType<SupplierBlDepositStorage>>;

  abstract findByIds(
    ids: SupplierBlDepositStorage['id'][],
  ): Promise<SupplierBlDepositStorage[]>;

  abstract update(
    id: SupplierBlDepositStorage['id'],
    payload: DeepPartial<SupplierBlDepositStorage>,
  ): Promise<SupplierBlDepositStorage | null>;

  abstract remove(id: SupplierBlDepositStorage['id']): Promise<void>;
}
