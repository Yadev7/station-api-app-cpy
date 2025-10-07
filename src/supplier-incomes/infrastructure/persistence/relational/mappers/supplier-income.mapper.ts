import { SupplierIncome } from '../../../../domain/supplier-income';
import { SupplierBlMapper } from '../../../../../supplier-bls/infrastructure/persistence/relational/mappers/supplier-bl.mapper';

import { SupplierIncomeEntity } from '../entities/supplier-income.entity';

export class SupplierIncomeMapper {
  static toDomain(raw: SupplierIncomeEntity): SupplierIncome {
    const domainEntity = new SupplierIncome();
    if (raw.SupplierBlId) {
      domainEntity.SupplierBlId = SupplierBlMapper.toDomain(raw.SupplierBlId);
    } else if (raw.SupplierBlId === null) {
      domainEntity.SupplierBlId = null;
    }

    domainEntity.comment = raw.comment;

    domainEntity.IncomeScan = raw.IncomeScan;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: SupplierIncome): SupplierIncomeEntity {
    const persistenceEntity = new SupplierIncomeEntity();
    if (domainEntity.SupplierBlId) {
      persistenceEntity.SupplierBlId = SupplierBlMapper.toPersistence(
        domainEntity.SupplierBlId,
      );
    } else if (domainEntity.SupplierBlId === null) {
      persistenceEntity.SupplierBlId = null;
    }

    persistenceEntity.comment = domainEntity.comment;

    persistenceEntity.IncomeScan = domainEntity.IncomeScan;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
