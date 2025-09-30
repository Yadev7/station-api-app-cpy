import { Deposit } from '../../../../domain/deposit';
import { StationMapper } from '../../../../../stations/infrastructure/persistence/relational/mappers/station.mapper';

import { DepositEntity } from '../entities/deposit.entity';

export class DepositMapper {
  static toDomain(raw: DepositEntity): Deposit {
    const domainEntity = new Deposit();
    if (raw.station) {
      domainEntity.station = StationMapper.toDomain(raw.station);
    }

    domainEntity.contact = raw.contact;

    domainEntity.address = raw.address;

    domainEntity.desc = raw.desc;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Deposit): DepositEntity {
    const persistenceEntity = new DepositEntity();
    if (domainEntity.station) {
      persistenceEntity.station = StationMapper.toPersistence(
        domainEntity.station,
      );
    }

    persistenceEntity.contact = domainEntity.contact;

    persistenceEntity.address = domainEntity.address;

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
