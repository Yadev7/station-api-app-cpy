import { SupplierIncomePaiement } from '../../../../domain/supplier-income-paiement';

import { SupplierIncomePaiementEntity } from '../entities/supplier-income-paiement.entity';

export class SupplierIncomePaiementMapper {
  static toDomain(raw: SupplierIncomePaiementEntity): SupplierIncomePaiement {
    const domainEntity = new SupplierIncomePaiement();
    domainEntity.paiementType = raw.paiementType;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: SupplierIncomePaiement,
  ): SupplierIncomePaiementEntity {
    const persistenceEntity = new SupplierIncomePaiementEntity();
    persistenceEntity.paiementType = domainEntity.paiementType;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
