import { DispenserEntity } from '../../../../../dispensers/infrastructure/persistence/relational/entities/dispenser.entity';

import { StationEntity } from '../../../../../stations/infrastructure/persistence/relational/entities/station.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'islet',
  schema: 'station-config',
})
export class IsletEntity extends EntityRelationalHelper {
  @OneToMany(() => DispenserEntity, (childEntity) => childEntity.islet, {
    eager: true,
    nullable: true,
  })
  dispensers?: DispenserEntity[] | null;

  @ManyToOne(() => StationEntity, (parentEntity) => parentEntity.islets, {
    eager: false,
    nullable: false,
  })
  station: StationEntity;

  @Column({
    type: 'varchar',
    length: 10, // ✅ max 10 characters
    nullable: false,
    unique: true, // ✅ unique constraint
  })
  isletRef: string;

  @Column({
    nullable: true,
    type: String,
  })
  desc?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
