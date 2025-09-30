import { StationMapper } from 'src/stations/infrastructure/persistence/relational/mappers/station.mapper';
import { Tank } from '../../../../domain/tank';

import { TankEntity } from '../entities/tank.entity';
import { ProductMapper } from 'src/products/infrastructure/persistence/relational/mappers/product.mapper';

export class TankMapper {
  static toDomain(raw: TankEntity): Tank {
    const domainEntity = new Tank();

    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    }

    if (raw.station) {
      domainEntity.station = StationMapper.toDomain(raw.station);
    }

    domainEntity.desc = raw.desc;

    domainEntity.maxCapacity = raw.maxCapacity;

    domainEntity.minCapacity = raw.minCapacity;

    domainEntity.directSale = raw.directSale;

    domainEntity.refId = raw.refId;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Tank): TankEntity {
    const persistenceEntity = new TankEntity();
    if (domainEntity.product) {
      persistenceEntity.product = ProductMapper.toPersistence(
        domainEntity.product,
      );
    }
    if (domainEntity.station) {
      persistenceEntity.station = StationMapper.toPersistence(
        domainEntity.station,
      );
    }

    persistenceEntity.desc = domainEntity.desc;

    persistenceEntity.maxCapacity = domainEntity.maxCapacity;

    persistenceEntity.minCapacity = domainEntity.minCapacity;

    persistenceEntity.directSale = domainEntity.directSale;

    persistenceEntity.refId = domainEntity.refId;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
