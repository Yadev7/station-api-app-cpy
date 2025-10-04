import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Devis } from '../../domain/devis';

export abstract class DevisRepository {
  abstract create(
    data: Omit<Devis, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Devis>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Devis[]>;

  abstract findById(id: Devis['id']): Promise<NullableType<Devis>>;

  abstract findByIds(ids: Devis['id'][]): Promise<Devis[]>;

  abstract update(
    id: Devis['id'],
    payload: DeepPartial<Devis>,
  ): Promise<Devis | null>;

  abstract remove(id: Devis['id']): Promise<void>;
}
