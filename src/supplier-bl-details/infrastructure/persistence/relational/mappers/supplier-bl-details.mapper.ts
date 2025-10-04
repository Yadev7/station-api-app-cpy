import { SupplierBlDetails } from '../../../../domain/supplier-bl-details';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { SupplierBlMapper } from '../../../../../supplier-bls/infrastructure/persistence/relational/mappers/supplier-bl.mapper';

import { SupplierBlDetailsEntity } from '../entities/supplier-bl-details.entity';

export class SupplierBlDetailsMapper {
  static toDomain(raw: SupplierBlDetailsEntity): SupplierBlDetails {
    const domainEntity = new SupplierBlDetails();
    domainEntity.price = raw.price;

    domainEntity.unitPrice = raw.unitPrice;

    domainEntity.deliveredQty = raw.deliveredQty;

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
    domainEntity: SupplierBlDetails,
  ): SupplierBlDetailsEntity {
    const persistenceEntity = new SupplierBlDetailsEntity();
    persistenceEntity.price = domainEntity.price;

    persistenceEntity.unitPrice = domainEntity.unitPrice;

    persistenceEntity.deliveredQty = domainEntity.deliveredQty;

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
