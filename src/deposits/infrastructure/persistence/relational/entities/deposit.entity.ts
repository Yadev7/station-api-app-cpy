import { StationEntity } from '../../../../../stations/infrastructure/persistence/relational/entities/station.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ContactDto } from 'src/shared/dto/contact.dto';
import { AddressDto } from 'src/shared/dto/address.dto';

@Entity({
  name: 'deposit',
  schema: 'station-config',
})
export class DepositEntity extends EntityRelationalHelper {
  @ManyToOne(() => StationEntity, (parentEntity) => parentEntity.deposits, {
    eager: false,
    nullable: false,
  })
  station: StationEntity;

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

  @Column({
    nullable: true,
    type: String,
  })
  desc?: string | null;

  @Column({
    type: 'varchar',
    length: 10, // ✅ max 10 characters
    nullable: false,
    unique: true, // ✅ unique constraint
    default: 'depot-1',
  })
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
