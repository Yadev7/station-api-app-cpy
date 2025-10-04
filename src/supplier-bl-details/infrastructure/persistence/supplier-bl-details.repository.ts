import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SupplierBlDetails } from '../../domain/supplier-bl-details';

export abstract class SupplierBlDetailsRepository {
  abstract create(
    data: Omit<SupplierBlDetails, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SupplierBlDetails>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierBlDetails[]>;

  abstract findById(
    id: SupplierBlDetails['id'],
  ): Promise<NullableType<SupplierBlDetails>>;

  abstract findByIds(
    ids: SupplierBlDetails['id'][],
  ): Promise<SupplierBlDetails[]>;

  abstract update(
    id: SupplierBlDetails['id'],
    payload: DeepPartial<SupplierBlDetails>,
  ): Promise<SupplierBlDetails | null>;

  abstract remove(id: SupplierBlDetails['id']): Promise<void>;
}
