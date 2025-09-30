import { DispenserEntity } from '../../../../../dispensers/infrastructure/persistence/relational/entities/dispenser.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'nozzle',
  schema: 'station-config',
})
export class NozzleEntity extends EntityRelationalHelper {
  @ManyToOne(() => DispenserEntity, (parentEntity) => parentEntity.nozzles, {
    eager: false,
    nullable: false,
  })
  dispenser: DispenserEntity;

  @Column({
    type: 'timestamptz', // timezone-aware
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastIndexTime?: Date;

  @Column({
    type: 'timestamptz', // timezone-aware
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastIndexDate?: Date;

  @Column({
    nullable: false,
    type: Number,
  })
  lastIndex?: number;

  @Column({
    nullable: false,
    type: Number,
  })
  lubricantRate?: number;

  @Column({
    nullable: false,
    type: Boolean,
  })
  isMixer?: boolean;

  @Column({
    type: 'varchar',
    length: 10, // ✅ max 10 characters
    nullable: false,
    unique: true, // ✅ unique constraint
  })
  nozzleRef: string;

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
