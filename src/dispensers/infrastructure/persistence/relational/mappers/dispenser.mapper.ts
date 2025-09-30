import { Dispenser } from '../../../../domain/dispenser';
import { NozzleMapper } from '../../../../../nozzles/infrastructure/persistence/relational/mappers/nozzle.mapper';

import { IsletMapper } from '../../../../../islets/infrastructure/persistence/relational/mappers/islet.mapper';

import { DispenserEntity } from '../entities/dispenser.entity';

export class DispenserMapper {
  static toDomain(raw: DispenserEntity): Dispenser {
    const domainEntity = new Dispenser();
    if (raw.nozzles) {
      domainEntity.nozzles = raw.nozzles.map((item) =>
        NozzleMapper.toDomain(item),
      );
    } else if (raw.nozzles === null) {
      domainEntity.nozzles = null;
    }

    if (raw.islet) {
      domainEntity.islet = IsletMapper.toDomain(raw.islet);
    }

    domainEntity.dispRef = raw.dispRef;

    domainEntity.desc = raw.desc;

    domainEntity.brand = raw.brand;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Dispenser): DispenserEntity {
    const persistenceEntity = new DispenserEntity();
    if (domainEntity.nozzles) {
      persistenceEntity.nozzles = domainEntity.nozzles.map((item) =>
        NozzleMapper.toPersistence(item),
      );
    } else if (domainEntity.nozzles === null) {
      persistenceEntity.nozzles = null;
    }

    if (domainEntity.islet) {
      persistenceEntity.islet = IsletMapper.toPersistence(domainEntity.islet);
    }

    persistenceEntity.dispRef = domainEntity.dispRef;

    persistenceEntity.desc = domainEntity.desc;

    persistenceEntity.brand = domainEntity.brand;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
