import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SupplierPaiementDetails } from '../../domain/supplier-paiement-details';

export abstract class SupplierPaiementDetailsRepository {
  abstract create(
    data: Omit<SupplierPaiementDetails, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SupplierPaiementDetails>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SupplierPaiementDetails[]>;

  abstract findById(
    id: SupplierPaiementDetails['id'],
  ): Promise<NullableType<SupplierPaiementDetails>>;

  abstract findByIds(
    ids: SupplierPaiementDetails['id'][],
  ): Promise<SupplierPaiementDetails[]>;

  abstract update(
    id: SupplierPaiementDetails['id'],
    payload: DeepPartial<SupplierPaiementDetails>,
  ): Promise<SupplierPaiementDetails | null>;

  abstract remove(id: SupplierPaiementDetails['id']): Promise<void>;
}
