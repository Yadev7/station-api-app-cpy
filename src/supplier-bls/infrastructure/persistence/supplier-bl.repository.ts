import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SupplierBl } from '../../domain/supplier-bl';

export abstract class SupplierBlRepository {
  abstract create(
    data: Omit<SupplierBl, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SupplierBl>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierBl[]>;

  abstract findById(id: SupplierBl['id']): Promise<NullableType<SupplierBl>>;

  abstract findByIds(ids: SupplierBl['id'][]): Promise<SupplierBl[]>;

  abstract update(
    id: SupplierBl['id'],
    payload: DeepPartial<SupplierBl>,
  ): Promise<SupplierBl | null>;

  abstract remove(id: SupplierBl['id']): Promise<void>;
}
