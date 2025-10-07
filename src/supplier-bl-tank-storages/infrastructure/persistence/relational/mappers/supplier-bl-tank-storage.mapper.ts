import { SupplierBlTankStorage } from '../../../../domain/supplier-bl-tank-storage';

import { TankMapper } from '../../../../../tanks/infrastructure/persistence/relational/mappers/tank.mapper';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { SupplierBlMapper } from '../../../../../supplier-bls/infrastructure/persistence/relational/mappers/supplier-bl.mapper';

import { SupplierBlTankStorageEntity } from '../entities/supplier-bl-tank-storage.entity';

export class SupplierBlTankStorageMapper {
  static toDomain(raw: SupplierBlTankStorageEntity): SupplierBlTankStorage {
    const domainEntity = new SupplierBlTankStorage();
    domainEntity.storedQty = raw.storedQty;

    if (raw.TankId) {
      domainEntity.TankId = TankMapper.toDomain(raw.TankId);
    } else if (raw.TankId === null) {
      domainEntity.TankId = null;
    }

    if (raw.ProductId) {
      domainEntity.ProductId = ProductMapper.toDomain(raw.ProductId);
    } else if (raw.ProductId === null) {
      domainEntity.ProductId = null;
    }

    if (raw.SupplierBlId) {
      domainEntity.SupplierBlId = SupplierBlMapper.toDomain(raw.SupplierBlId);
    } else if (raw.SupplierBlId === null) {
      domainEntity.SupplierBlId = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: SupplierBlTankStorage,
  ): SupplierBlTankStorageEntity {
    const persistenceEntity = new SupplierBlTankStorageEntity();
    persistenceEntity.storedQty = domainEntity.storedQty;

    if (domainEntity.TankId) {
      persistenceEntity.TankId = TankMapper.toPersistence(domainEntity.TankId);
    } else if (domainEntity.TankId === null) {
      persistenceEntity.TankId = null;
    }

    if (domainEntity.ProductId) {
      persistenceEntity.ProductId = ProductMapper.toPersistence(
        domainEntity.ProductId,
      );
    } else if (domainEntity.ProductId === null) {
      persistenceEntity.ProductId = null;
    }

    if (domainEntity.SupplierBlId) {
      persistenceEntity.SupplierBlId = SupplierBlMapper.toPersistence(
        domainEntity.SupplierBlId,
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
