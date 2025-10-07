import { SupplierBlDepositStorageEntity } from '../../../../../supplier-bl-deposit-storages/infrastructure/persistence/relational/entities/supplier-bl-deposit-storage.entity';

import { SupplierOrderEntity } from '../../../../../supplier-orders/infrastructure/persistence/relational/entities/supplier-order.entity';

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
  name: 'supplier_bl',
  schema: 'station-achat',
})
export class SupplierBlEntity extends EntityRelationalHelper {
  @ManyToOne(
    () => SupplierBlDepositStorageEntity,
    (parentEntity) => parentEntity.SupplierBlId,
    { eager: false, nullable: false },
  )
  SupplierBlDepositStorageRef: SupplierBlDepositStorageEntity;

  @Column({
    nullable: true,
    type: Number,
  })
  amountPriceHt?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  SuppBlScan?: string | null;

  @ManyToOne(() => SupplierOrderEntity, { eager: true, nullable: true })
  SupplierOrderId?: SupplierOrderEntity | null;

  @Column({
    nullable: true,
    type: String,
  })
  comment?: string | null;

  @Column({
    nullable: true,
    type: Date,
  })
  receptionDate?: Date | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
