import { SupplierOrderDetails } from '../../../../domain/supplier-order-details';
import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { SupplierMapper } from '../../../../../suppliers/infrastructure/persistence/relational/mappers/supplier.mapper';

import { SupplierOrderDetailsEntity } from '../entities/supplier-order-details.entity';

export class SupplierOrderDetailsMapper {
  static toDomain(raw: SupplierOrderDetailsEntity): SupplierOrderDetails {
    const domainEntity = new SupplierOrderDetails();
    if (raw.ProductId) {
      domainEntity.ProductId = ProductMapper.toDomain(raw.ProductId);
    } else if (raw.ProductId === null) {
      domainEntity.ProductId = null;
    }

    if (raw.SupplierId) {
      domainEntity.SupplierId = SupplierMapper.toDomain(raw.SupplierId);
    } else if (raw.SupplierId === null) {
      domainEntity.SupplierId = null;
    }

    domainEntity.unitPrice = raw.unitPrice;

    domainEntity.orderQty = raw.orderQty;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: SupplierOrderDetails,
  ): SupplierOrderDetailsEntity {
    const persistenceEntity = new SupplierOrderDetailsEntity();
    if (domainEntity.ProductId) {
      persistenceEntity.ProductId = ProductMapper.toPersistence(
        domainEntity.ProductId,
      );
    } else if (domainEntity.ProductId === null) {
      persistenceEntity.ProductId = null;
    }

    if (domainEntity.SupplierId) {
      persistenceEntity.SupplierId = SupplierMapper.toPersistence(
        domainEntity.SupplierId,
      );
    } else if (domainEntity.SupplierId === null) {
      persistenceEntity.SupplierId = null;
    }

    persistenceEntity.unitPrice = domainEntity.unitPrice;

    persistenceEntity.orderQty = domainEntity.orderQty;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
