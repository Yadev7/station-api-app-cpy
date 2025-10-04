import { SupplierBl } from '../../../../domain/supplier-bl';

import { SupplierOrderMapper } from '../../../../../supplier-orders/infrastructure/persistence/relational/mappers/supplier-order.mapper';

import { SupplierBlEntity } from '../entities/supplier-bl.entity';

export class SupplierBlMapper {
  static toDomain(raw: SupplierBlEntity): SupplierBl {
    const domainEntity = new SupplierBl();
    domainEntity.amountPriceHt = raw.amountPriceHt;

    domainEntity.SuppBlScan = raw.SuppBlScan;

    if (raw.SupplierOrderId) {
      domainEntity.SupplierOrderId = SupplierOrderMapper.toDomain(
        raw.SupplierOrderId,
      );
    } else if (raw.SupplierOrderId === null) {
      domainEntity.SupplierOrderId = null;
    }

    domainEntity.comment = raw.comment;

    domainEntity.receptionDate = raw.receptionDate;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: SupplierBl): SupplierBlEntity {
    const persistenceEntity = new SupplierBlEntity();
    persistenceEntity.amountPriceHt = domainEntity.amountPriceHt;

    persistenceEntity.SuppBlScan = domainEntity.SuppBlScan;

    if (domainEntity.SupplierOrderId) {
      persistenceEntity.SupplierOrderId = SupplierOrderMapper.toPersistence(
        domainEntity.SupplierOrderId,
      );
    } else if (domainEntity.SupplierOrderId === null) {
      persistenceEntity.SupplierOrderId = null;
    }

    persistenceEntity.comment = domainEntity.comment;

    persistenceEntity.receptionDate = domainEntity.receptionDate;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
