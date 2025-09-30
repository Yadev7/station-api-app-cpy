import { Product } from '../../../../domain/product';
import { StationMapper } from '../../../../../stations/infrastructure/persistence/relational/mappers/station.mapper';

import { CategoryMapper } from '../../../../../categories/infrastructure/persistence/relational/mappers/category.mapper';

import { ProductEntity } from '../entities/product.entity';
import { TankMapper } from 'src/tanks/infrastructure/persistence/relational/mappers/tank.mapper';

export class ProductMapper {
  static toDomain(raw: ProductEntity): Product {
    const domainEntity = new Product();
    if (raw.tanks) {
      domainEntity.tanks = raw.tanks.map((item) => TankMapper.toDomain(item));
    } else if (raw.tanks === null) {
      domainEntity.tanks = null;
    }

    if (raw.station) {
      domainEntity.station = StationMapper.toDomain(raw.station);
    }

    if (raw.category) {
      domainEntity.category = CategoryMapper.toDomain(raw.category);
    }

    domainEntity.pricesHistory = raw.pricesHistory;

    domainEntity.dateAppliedPrices = raw.dateAppliedPrices;

    domainEntity.salePrice = raw.salePrice;

    domainEntity.purchasePrice = raw.purchasePrice;

    domainEntity.unit = raw.unit;

    domainEntity.totalQuantity = raw.totalQuantity;

    domainEntity.desc = raw.desc;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Product): ProductEntity {
    const persistenceEntity = new ProductEntity();
    if (domainEntity.tanks) {
      persistenceEntity.tanks = domainEntity.tanks.map((item) =>
        TankMapper.toPersistence(item),
      );
    } else if (domainEntity.tanks === null) {
      persistenceEntity.tanks = null;
    }

    if (domainEntity.station) {
      persistenceEntity.station = StationMapper.toPersistence(
        domainEntity.station,
      );
    }

    if (domainEntity.category) {
      persistenceEntity.category = CategoryMapper.toPersistence(
        domainEntity.category,
      );
    }

    persistenceEntity.pricesHistory = domainEntity.pricesHistory;

    persistenceEntity.dateAppliedPrices = domainEntity.dateAppliedPrices;

    persistenceEntity.salePrice = domainEntity.salePrice;

    persistenceEntity.purchasePrice = domainEntity.purchasePrice;

    persistenceEntity.unit = domainEntity.unit;

    persistenceEntity.totalQuantity = domainEntity.totalQuantity;

    persistenceEntity.desc = domainEntity.desc;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
