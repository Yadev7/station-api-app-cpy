import { NozzleEntity } from '../../../../../nozzles/infrastructure/persistence/relational/entities/nozzle.entity';

import { IsletEntity } from '../../../../../islets/infrastructure/persistence/relational/entities/islet.entity';

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
  name: 'dispenser',
  schema: 'station-config',
})
export class DispenserEntity extends EntityRelationalHelper {
  @OneToMany(() => NozzleEntity, (childEntity) => childEntity.dispenser, {
    eager: true,
    nullable: true,
  })
  nozzles?: NozzleEntity[] | null;

  @ManyToOne(() => IsletEntity, (parentEntity) => parentEntity.dispensers, {
    eager: false,
    nullable: false,
  })
  islet: IsletEntity;

  @Column({
    type: 'varchar',
    length: 10, // ✅ max 10 characters
    nullable: false,
    unique: true, // ✅ unique constraint
  })
  dispRef: string;

  @Column({
    nullable: true,
    type: String,
  })
  desc?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  brand?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
