import { SupplierOrderEntity } from '../../../../../supplier-orders/infrastructure/persistence/relational/entities/supplier-order.entity';

import { SupplierEntity } from '../../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';

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
  name: 'devis',
  schema: 'station-achat',
})
export class DevisEntity extends EntityRelationalHelper {
  @ManyToOne(
    () => SupplierOrderEntity,
    (parentEntity) => parentEntity.idDevis,
    { eager: false, nullable: false },
  )
  supplierOrderRef: SupplierOrderEntity;

  @ManyToOne(() => SupplierEntity, { eager: true, nullable: true })
  idSupplier?: SupplierEntity | null;

  @Column({
    nullable: true,
    type: String,
  })
  comment?: string | null;

  @Column({
    nullable: true,
    type: Date,
  })
  date?: Date | null;

  @Column({
    nullable: true,
    type: String,
  })
  numRef?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
