import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SupplierBlTankStorage } from '../../domain/supplier-bl-tank-storage';

export abstract class SupplierBlTankStorageRepository {
  abstract create(
    data: Omit<SupplierBlTankStorage, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SupplierBlTankStorage>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierBlTankStorage[]>;

  abstract findById(
    id: SupplierBlTankStorage['id'],
  ): Promise<NullableType<SupplierBlTankStorage>>;

  abstract findByIds(
    ids: SupplierBlTankStorage['id'][],
  ): Promise<SupplierBlTankStorage[]>;

  abstract update(
    id: SupplierBlTankStorage['id'],
    payload: DeepPartial<SupplierBlTankStorage>,
  ): Promise<SupplierBlTankStorage | null>;

  abstract remove(id: SupplierBlTankStorage['id']): Promise<void>;
}
