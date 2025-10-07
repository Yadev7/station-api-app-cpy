import { DepositEntity } from '../../../../../deposits/infrastructure/persistence/relational/entities/deposit.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { SupplierBlEntity } from '../../../../../supplier-bls/infrastructure/persistence/relational/entities/supplier-bl.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'supplier_bl_deposit_storage',
  schema: 'station-achat',
})
export class SupplierBlDepositStorageEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  storedQty?: number | null;

  @Column({
    nullable: true,
    type: Date,
  })
  date?: Date | null;

  @ManyToOne(() => DepositEntity, { eager: true, nullable: true })
  depositId?: DepositEntity | null;

  @ManyToOne(() => ProductEntity, { eager: true, nullable: true })
  productId?: ProductEntity | null;

  @OneToMany(
    () => SupplierBlEntity,
    (childEntity) => childEntity.SupplierBlDepositStorageRef,
    { eager: true, nullable: true },
  )
  SupplierBlId?: SupplierBlEntity[] | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
