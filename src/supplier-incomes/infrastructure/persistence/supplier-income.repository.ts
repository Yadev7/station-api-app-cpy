import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SupplierIncome } from '../../domain/supplier-income';

export abstract class SupplierIncomeRepository {
  abstract create(
    data: Omit<SupplierIncome, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SupplierIncome>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierIncome[]>;

  abstract findById(
    id: SupplierIncome['id'],
  ): Promise<NullableType<SupplierIncome>>;

  abstract findByIds(ids: SupplierIncome['id'][]): Promise<SupplierIncome[]>;

  abstract update(
    id: SupplierIncome['id'],
    payload: DeepPartial<SupplierIncome>,
  ): Promise<SupplierIncome | null>;

  abstract remove(id: SupplierIncome['id']): Promise<void>;
}
