import { SupplierPaiementDetails } from '../../../../domain/supplier-paiement-details';

import { SupplierIncomeMapper } from '../../../../../supplier-incomes/infrastructure/persistence/relational/mappers/supplier-income.mapper';

import { SupplierPaiementDetailsEntity } from '../entities/supplier-paiement-details.entity';

export class SupplierPaiementDetailsMapper {
  static toDomain(raw: SupplierPaiementDetailsEntity): SupplierPaiementDetails {
    const domainEntity = new SupplierPaiementDetails();
    domainEntity.paiementAmount = raw.paiementAmount;

    if (raw.SupplierIncomeId) {
      domainEntity.SupplierIncomeId = SupplierIncomeMapper.toDomain(
        raw.SupplierIncomeId,
      );
    } else if (raw.SupplierIncomeId === null) {
      domainEntity.SupplierIncomeId = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: SupplierPaiementDetails,
  ): SupplierPaiementDetailsEntity {
    const persistenceEntity = new SupplierPaiementDetailsEntity();
    persistenceEntity.paiementAmount = domainEntity.paiementAmount;

    if (domainEntity.SupplierIncomeId) {
      persistenceEntity.SupplierIncomeId = SupplierIncomeMapper.toPersistence(
        domainEntity.SupplierIncomeId,
      );
    } else if (domainEntity.SupplierIncomeId === null) {
      persistenceEntity.SupplierIncomeId = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
