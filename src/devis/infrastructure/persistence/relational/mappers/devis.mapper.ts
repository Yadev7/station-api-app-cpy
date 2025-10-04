import { Devis } from '../../../../domain/devis';
import { SupplierOrderMapper } from '../../../../../supplier-orders/infrastructure/persistence/relational/mappers/supplier-order.mapper';

import { SupplierMapper } from '../../../../../suppliers/infrastructure/persistence/relational/mappers/supplier.mapper';

import { DevisEntity } from '../entities/devis.entity';

export class DevisMapper {
  static toDomain(raw: DevisEntity): Devis {
    const domainEntity = new Devis();
    if (raw.supplierOrderRef) {
      domainEntity.supplierOrderRef = SupplierOrderMapper.toDomain(
        raw.supplierOrderRef,
      );
    }

    if (raw.idSupplier) {
      domainEntity.idSupplier = SupplierMapper.toDomain(raw.idSupplier);
    } else if (raw.idSupplier === null) {
      domainEntity.idSupplier = null;
    }

    domainEntity.comment = raw.comment;

    domainEntity.date = raw.date;

    domainEntity.numRef = raw.numRef;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Devis): DevisEntity {
    const persistenceEntity = new DevisEntity();
    if (domainEntity.supplierOrderRef) {
      persistenceEntity.supplierOrderRef = SupplierOrderMapper.toPersistence(
        domainEntity.supplierOrderRef,
      );
    }

    if (domainEntity.idSupplier) {
      persistenceEntity.idSupplier = SupplierMapper.toPersistence(
        domainEntity.idSupplier,
      );
    } else if (domainEntity.idSupplier === null) {
      persistenceEntity.idSupplier = null;
    }

    persistenceEntity.comment = domainEntity.comment;

    persistenceEntity.date = domainEntity.date;

    persistenceEntity.numRef = domainEntity.numRef;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
