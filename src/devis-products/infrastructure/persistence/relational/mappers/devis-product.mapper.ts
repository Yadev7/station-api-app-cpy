import { DevisProduct } from '../../../../domain/devis-product';

import { DevisMapper } from '../../../../../devis/infrastructure/persistence/relational/mappers/devis.mapper';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { DevisProductEntity } from '../entities/devis-product.entity';

export class DevisProductMapper {
  static toDomain(raw: DevisProductEntity): DevisProduct {
    const domainEntity = new DevisProduct();
    domainEntity.SupplierPrice = raw.SupplierPrice;

    domainEntity.unit = raw.unit;

    domainEntity.Qty = raw.Qty;

    if (raw.idDevis) {
      domainEntity.idDevis = DevisMapper.toDomain(raw.idDevis);
    } else if (raw.idDevis === null) {
      domainEntity.idDevis = null;
    }

    if (raw.idProduct) {
      domainEntity.idProduct = ProductMapper.toDomain(raw.idProduct);
    } else if (raw.idProduct === null) {
      domainEntity.idProduct = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: DevisProduct): DevisProductEntity {
    const persistenceEntity = new DevisProductEntity();
    persistenceEntity.SupplierPrice = domainEntity.SupplierPrice;

    persistenceEntity.unit = domainEntity.unit;

    persistenceEntity.Qty = domainEntity.Qty;

    if (domainEntity.idDevis) {
      persistenceEntity.idDevis = DevisMapper.toPersistence(
        domainEntity.idDevis,
      );
    } else if (domainEntity.idDevis === null) {
      persistenceEntity.idDevis = null;
    }

    if (domainEntity.idProduct) {
      persistenceEntity.idProduct = ProductMapper.toPersistence(
        domainEntity.idProduct,
      );
    } else if (domainEntity.idProduct === null) {
      persistenceEntity.idProduct = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
