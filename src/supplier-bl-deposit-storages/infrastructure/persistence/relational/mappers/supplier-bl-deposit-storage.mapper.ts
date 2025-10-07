import { SupplierBlDepositStorage } from '../../../../domain/supplier-bl-deposit-storage';

import { DepositMapper } from '../../../../../deposits/infrastructure/persistence/relational/mappers/deposit.mapper';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { SupplierBlMapper } from '../../../../../supplier-bls/infrastructure/persistence/relational/mappers/supplier-bl.mapper';

import { SupplierBlDepositStorageEntity } from '../entities/supplier-bl-deposit-storage.entity';

export class SupplierBlDepositStorageMapper {
  static toDomain(
    raw: SupplierBlDepositStorageEntity,
  ): SupplierBlDepositStorage {
    const domainEntity = new SupplierBlDepositStorage();
    domainEntity.storedQty = raw.storedQty;

    domainEntity.date = raw.date;

    if (raw.depositId) {
      domainEntity.depositId = DepositMapper.toDomain(raw.depositId);
    } else if (raw.depositId === null) {
      domainEntity.depositId = null;
    }

    if (raw.productId) {
      domainEntity.productId = ProductMapper.toDomain(raw.productId);
    } else if (raw.productId === null) {
      domainEntity.productId = null;
    }

    if (raw.SupplierBlId) {
      domainEntity.SupplierBlId = raw.SupplierBlId.map((item) =>
        SupplierBlMapper.toDomain(item),
      );
    } else if (raw.SupplierBlId === null) {
      domainEntity.SupplierBlId = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: SupplierBlDepositStorage,
  ): SupplierBlDepositStorageEntity {
    const persistenceEntity = new SupplierBlDepositStorageEntity();
    persistenceEntity.storedQty = domainEntity.storedQty;

    persistenceEntity.date = domainEntity.date;

    if (domainEntity.depositId) {
      persistenceEntity.depositId = DepositMapper.toPersistence(
        domainEntity.depositId,
      );
    } else if (domainEntity.depositId === null) {
      persistenceEntity.depositId = null;
    }

    if (domainEntity.productId) {
      persistenceEntity.productId = ProductMapper.toPersistence(
        domainEntity.productId,
      );
    } else if (domainEntity.productId === null) {
      persistenceEntity.productId = null;
    }

    if (domainEntity.SupplierBlId) {
      persistenceEntity.SupplierBlId = domainEntity.SupplierBlId.map((item) =>
        SupplierBlMapper.toPersistence(item),
      );
    } else if (domainEntity.SupplierBlId === null) {
      persistenceEntity.SupplierBlId = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
