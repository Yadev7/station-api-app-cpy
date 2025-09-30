import { Nozzle } from '../../../../domain/nozzle';
import { DispenserMapper } from '../../../../../dispensers/infrastructure/persistence/relational/mappers/dispenser.mapper';

import { NozzleEntity } from '../entities/nozzle.entity';

export class NozzleMapper {
  static toDomain(raw: NozzleEntity): Nozzle {
    const domainEntity = new Nozzle();
    if (raw.dispenser) {
      domainEntity.dispenser = DispenserMapper.toDomain(raw.dispenser);
    }

    domainEntity.lastIndexTime = raw.lastIndexTime;

    domainEntity.lastIndexDate = raw.lastIndexDate;

    domainEntity.lastIndex = raw.lastIndex;

    domainEntity.lubricantRate = raw.lubricantRate;

    domainEntity.isMixer = raw.isMixer;

    domainEntity.nozzleRef = raw.nozzleRef;

    domainEntity.desc = raw.desc;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Nozzle): NozzleEntity {
    const persistenceEntity = new NozzleEntity();
    if (domainEntity.dispenser) {
      persistenceEntity.dispenser = DispenserMapper.toPersistence(
        domainEntity.dispenser,
      );
    }

    persistenceEntity.lastIndexTime = domainEntity.lastIndexTime;

    persistenceEntity.lastIndexDate = domainEntity.lastIndexDate;

    persistenceEntity.lastIndex = domainEntity.lastIndex;

    persistenceEntity.lubricantRate = domainEntity.lubricantRate;

    persistenceEntity.isMixer = domainEntity.isMixer;

    persistenceEntity.nozzleRef = domainEntity.nozzleRef;

    persistenceEntity.desc = domainEntity.desc;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
