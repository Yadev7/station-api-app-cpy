import { SupplierOrder } from '../../../../domain/supplier-order';
import { DevisMapper } from '../../../../../devis/infrastructure/persistence/relational/mappers/devis.mapper';
import { SupplierMapper } from '../../../../../suppliers/infrastructure/persistence/relational/mappers/supplier.mapper';
import {
  SupplierOrderEntity,
  OrderSupplierState,
} from '../entities/supplier-order.entity';

export class SupplierOrderMapper {
  static toDomain(raw: SupplierOrderEntity): SupplierOrder {
    const domainEntity = new SupplierOrder();

    domainEntity.orderSupplierState = raw.orderSupplierState
      ? (raw.orderSupplierState as OrderSupplierState)
      : null;

    domainEntity.idDevis = raw.idDevis
      ? raw.idDevis.map((item) => DevisMapper.toDomain(item))
      : null;

    domainEntity.Amount = raw.Amount ?? null;
    domainEntity.orderState = raw.orderState ?? null;
    domainEntity.orderRef = raw.orderRef ?? null;
    domainEntity.date = raw.date ?? null;

    domainEntity.idSupplier = raw.idSupplier
      ? SupplierMapper.toDomain(raw.idSupplier)
      : null;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: SupplierOrder): SupplierOrderEntity {
    const persistenceEntity = new SupplierOrderEntity();

    persistenceEntity.orderSupplierState = domainEntity.orderSupplierState
      ? (domainEntity.orderSupplierState as OrderSupplierState)
      : null;

    persistenceEntity.idDevis = domainEntity.idDevis
      ? domainEntity.idDevis.map((item) => DevisMapper.toPersistence(item))
      : null;

    persistenceEntity.Amount = domainEntity.Amount ?? null;
    persistenceEntity.orderState = domainEntity.orderState ?? null;
    persistenceEntity.orderRef = domainEntity.orderRef ?? null;
    persistenceEntity.date = domainEntity.date ?? null;

    persistenceEntity.idSupplier = domainEntity.idSupplier
      ? SupplierMapper.toPersistence(domainEntity.idSupplier)
      : null;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
