import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SupplierOrder } from '../../domain/supplier-order';

export abstract class SupplierOrderRepository {
  abstract create(
    data: Omit<SupplierOrder, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SupplierOrder>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierOrder[]>;

  abstract findById(
    id: SupplierOrder['id'],
  ): Promise<NullableType<SupplierOrder>>;

  abstract findByIds(ids: SupplierOrder['id'][]): Promise<SupplierOrder[]>;

  abstract update(
    id: SupplierOrder['id'],
    payload: DeepPartial<SupplierOrder>,
  ): Promise<SupplierOrder | null>;

  abstract remove(id: SupplierOrder['id']): Promise<void>;
}
