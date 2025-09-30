import { StationEntity } from '../../../../../stations/infrastructure/persistence/relational/entities/station.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ContactDto } from '../../../../../shared/dto/contact.dto';
import { AddressDto } from '../../../../../shared/dto/address.dto';

@Entity({
  name: 'station_owner',
  schema: 'station-config',
})
export class StationOwnerEntity extends EntityRelationalHelper {
  @OneToMany(() => StationEntity, (childEntity) => childEntity.owner, {
    eager: true,
    nullable: true,
  })
  stations?: StationEntity[] | null;

  @Column({
    nullable: false,
    type: String,
  })
  ownerType: string;

  @Column({
    nullable: false,
    type: String,
  })
  ownerName: string;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  contact?: ContactDto | null;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  address?: AddressDto | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
