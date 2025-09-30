import { Islet } from '../../../../domain/islet';
import { DispenserMapper } from '../../../../../dispensers/infrastructure/persistence/relational/mappers/dispenser.mapper';

import { StationMapper } from '../../../../../stations/infrastructure/persistence/relational/mappers/station.mapper';

import { IsletEntity } from '../entities/islet.entity';

export class IsletMapper {
  static toDomain(raw: IsletEntity): Islet {
    const domainEntity = new Islet();
    if (raw.dispensers) {
      domainEntity.dispensers = raw.dispensers.map((item) =>
        DispenserMapper.toDomain(item),
      );
    } else if (raw.dispensers === null) {
      domainEntity.dispensers = null;
    }

    if (raw.station) {
      domainEntity.station = StationMapper.toDomain(raw.station);
    }

    domainEntity.isletRef = raw.isletRef;

    domainEntity.desc = raw.desc;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Islet): IsletEntity {
    const persistenceEntity = new IsletEntity();
    if (domainEntity.dispensers) {
      persistenceEntity.dispensers = domainEntity.dispensers.map((item) =>
        DispenserMapper.toPersistence(item),
      );
    } else if (domainEntity.dispensers === null) {
      persistenceEntity.dispensers = null;
    }

    if (domainEntity.station) {
      persistenceEntity.station = StationMapper.toPersistence(
        domainEntity.station,
      );
    }

    persistenceEntity.isletRef = domainEntity.isletRef;

    persistenceEntity.desc = domainEntity.desc;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
