import { TankEntity } from '../../../../../tanks/infrastructure/persistence/relational/entities/tank.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { SupplierBlEntity } from '../../../../../supplier-bls/infrastructure/persistence/relational/entities/supplier-bl.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'supplier_bl_tank_storage',
  schema: 'station-achat',
})
export class SupplierBlTankStorageEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  storedQty?: number | null;

  @ManyToOne(() => TankEntity, { eager: true, nullable: true })
  TankId?: TankEntity | null;

  @ManyToOne(() => ProductEntity, { eager: true, nullable: true })
  ProductId?: ProductEntity | null;

  @ManyToOne(() => SupplierBlEntity, { eager: true, nullable: true })
  SupplierBlId?: SupplierBlEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
