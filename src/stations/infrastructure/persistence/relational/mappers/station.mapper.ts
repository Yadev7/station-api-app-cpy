import { Station } from '../../../../domain/station';
import { IsletMapper } from '../../../../../islets/infrastructure/persistence/relational/mappers/islet.mapper';

import { DepositMapper } from '../../../../../deposits/infrastructure/persistence/relational/mappers/deposit.mapper';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { StationOwnerMapper } from '../../../../../station-owners/infrastructure/persistence/relational/mappers/station-owner.mapper';

import { StationEntity } from '../entities/station.entity';
import { TankMapper } from 'src/tanks/infrastructure/persistence/relational/mappers/tank.mapper';

export class StationMapper {
  static toDomain(raw: StationEntity): Station {
    const domainEntity = new Station();
    if (raw.islets) {
      domainEntity.islets = raw.islets.map((item) =>
        IsletMapper.toDomain(item),
      );
    } else if (raw.islets === null) {
      domainEntity.islets = null;
    }

    if (raw.tanks) {
      domainEntity.tanks = raw.tanks.map((item) => TankMapper.toDomain(item));
    } else if (raw.tanks === null) {
      domainEntity.tanks = null;
    }

    if (raw.deposits) {
      domainEntity.deposits = raw.deposits.map((item) =>
        DepositMapper.toDomain(item),
      );
    } else if (raw.deposits === null) {
      domainEntity.deposits = null;
    }

    if (raw.products) {
      domainEntity.products = raw.products.map((item) =>
        ProductMapper.toDomain(item),
      );
    } else if (raw.products === null) {
      domainEntity.products = null;
    }

    if (raw.owner) {
      domainEntity.owner = StationOwnerMapper.toDomain(raw.owner);
    }

    domainEntity.name = raw.name;

    domainEntity.ICE = raw.ICE;

    domainEntity.RC = raw.RC;

    domainEntity.IF = raw.IF;

    domainEntity.CNSS = raw.CNSS;

    domainEntity.tvaCarb = raw.tvaCarb;

    domainEntity.tvaLub = raw.tvaLub;

    domainEntity.tvaService = raw.tvaService;

    domainEntity.tvaCoffeRest = raw.tvaCoffeRest;

    domainEntity.tvaShop = raw.tvaShop;

    domainEntity.displayHeader = raw.displayHeader;

    domainEntity.displayFooter = raw.displayFooter;

    domainEntity.logo = raw.logo;

    domainEntity.stampImg = raw.stampImg;

    domainEntity.signatureImg = raw.signatureImg;

    domainEntity.imgs = raw.imgs;

    domainEntity.contact = raw.contact;

    domainEntity.address = raw.address;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Station): StationEntity {
    const persistenceEntity = new StationEntity();
    if (domainEntity.islets) {
      persistenceEntity.islets = domainEntity.islets.map((item) =>
        IsletMapper.toPersistence(item),
      );
    } else if (domainEntity.islets === null) {
      persistenceEntity.islets = null;
    }

    if (domainEntity.tanks) {
      persistenceEntity.tanks = domainEntity.tanks.map((item) =>
        TankMapper.toPersistence(item),
      );
    } else if (domainEntity.tanks === null) {
      persistenceEntity.tanks = null;
    }

    if (domainEntity.deposits) {
      persistenceEntity.deposits = domainEntity.deposits.map((item) =>
        DepositMapper.toPersistence(item),
      );
    } else if (domainEntity.deposits === null) {
      persistenceEntity.deposits = null;
    }

    if (domainEntity.products) {
      persistenceEntity.products = domainEntity.products.map((item) =>
        ProductMapper.toPersistence(item),
      );
    } else if (domainEntity.products === null) {
      persistenceEntity.products = null;
    }

    if (domainEntity.owner) {
      persistenceEntity.owner = StationOwnerMapper.toPersistence(
        domainEntity.owner,
      );
    }

    persistenceEntity.name = domainEntity.name;

    persistenceEntity.ICE = domainEntity.ICE;

    persistenceEntity.RC = domainEntity.RC;

    persistenceEntity.IF = domainEntity.IF;

    persistenceEntity.CNSS = domainEntity.CNSS;

    persistenceEntity.tvaCarb = domainEntity.tvaCarb;

    persistenceEntity.tvaLub = domainEntity.tvaLub;

    persistenceEntity.tvaService = domainEntity.tvaService;

    persistenceEntity.tvaCoffeRest = domainEntity.tvaCoffeRest;

    persistenceEntity.tvaShop = domainEntity.tvaShop;

    persistenceEntity.displayHeader = domainEntity.displayHeader;

    persistenceEntity.displayFooter = domainEntity.displayFooter;

    persistenceEntity.logo = domainEntity.logo;

    persistenceEntity.stampImg = domainEntity.stampImg;

    persistenceEntity.signatureImg = domainEntity.signatureImg;

    persistenceEntity.imgs = domainEntity.imgs;

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
