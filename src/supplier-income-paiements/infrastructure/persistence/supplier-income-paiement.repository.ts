import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SupplierIncomePaiement } from '../../domain/supplier-income-paiement';

export abstract class SupplierIncomePaiementRepository {
  abstract create(
    data: Omit<SupplierIncomePaiement, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SupplierIncomePaiement>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierIncomePaiement[]>;

  abstract findById(
    id: SupplierIncomePaiement['id'],
  ): Promise<NullableType<SupplierIncomePaiement>>;

  abstract findByIds(
    ids: SupplierIncomePaiement['id'][],
  ): Promise<SupplierIncomePaiement[]>;

  abstract update(
    id: SupplierIncomePaiement['id'],
    payload: DeepPartial<SupplierIncomePaiement>,
  ): Promise<SupplierIncomePaiement | null>;

  abstract remove(id: SupplierIncomePaiement['id']): Promise<void>;
}
