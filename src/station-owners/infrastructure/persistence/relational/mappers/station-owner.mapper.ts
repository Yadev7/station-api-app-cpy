import { StationOwner } from '../../../../domain/station-owner';
import { StationMapper } from '../../../../../stations/infrastructure/persistence/relational/mappers/station.mapper';

import { StationOwnerEntity } from '../entities/station-owner.entity';

export class StationOwnerMapper {
  static toDomain(raw: StationOwnerEntity): StationOwner {
    const domainEntity = new StationOwner();
    if (raw.stations) {
      domainEntity.stations = raw.stations.map((item) =>
        StationMapper.toDomain(item),
      );
    } else if (raw.stations === null) {
      domainEntity.stations = null;
    }

    domainEntity.ownerType = raw.ownerType;

    domainEntity.ownerName = raw.ownerName;

    domainEntity.contact = raw.contact;

    domainEntity.address = raw.address;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: StationOwner): StationOwnerEntity {
    const persistenceEntity = new StationOwnerEntity();
    if (domainEntity.stations) {
      persistenceEntity.stations = domainEntity.stations.map((item) =>
        StationMapper.toPersistence(item),
      );
    } else if (domainEntity.stations === null) {
      persistenceEntity.stations = null;
    }

    persistenceEntity.ownerType = domainEntity.ownerType;

    persistenceEntity.ownerName = domainEntity.ownerName;

    persistenceEntity.contact = domainEntity.contact;

    persistenceEntity.address = domainEntity.address;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
