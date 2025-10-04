import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SupplierOrderDetails } from '../../domain/supplier-order-details';

export abstract class SupplierOrderDetailsRepository {
  abstract create(
    data: Omit<SupplierOrderDetails, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SupplierOrderDetails>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierOrderDetails[]>;

  abstract findById(
    id: SupplierOrderDetails['id'],
  ): Promise<NullableType<SupplierOrderDetails>>;

  abstract findByIds(
    ids: SupplierOrderDetails['id'][],
  ): Promise<SupplierOrderDetails[]>;

  abstract update(
    id: SupplierOrderDetails['id'],
    payload: DeepPartial<SupplierOrderDetails>,
  ): Promise<SupplierOrderDetails | null>;

  abstract remove(id: SupplierOrderDetails['id']): Promise<void>;
}
