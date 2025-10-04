import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { DevisProduct } from '../../domain/devis-product';

export abstract class DevisProductRepository {
  abstract create(
    data: Omit<DevisProduct, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<DevisProduct>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<DevisProduct[]>;

  abstract findById(
    id: DevisProduct['id'],
  ): Promise<NullableType<DevisProduct>>;

  abstract findByIds(ids: DevisProduct['id'][]): Promise<DevisProduct[]>;

  abstract update(
    id: DevisProduct['id'],
    payload: DeepPartial<DevisProduct>,
  ): Promise<DevisProduct | null>;

  abstract remove(id: DevisProduct['id']): Promise<void>;
}
