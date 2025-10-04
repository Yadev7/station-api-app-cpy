import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

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
  name: 'supplier_order_details',
  schema: 'station-achat',
})
export class SupplierOrderDetailsEntity extends EntityRelationalHelper {
  @ManyToOne(() => ProductEntity, { eager: true, nullable: true })
  ProductId?: ProductEntity | null;

  @ManyToOne(() => SupplierEntity, { eager: true, nullable: true })
  SupplierId?: SupplierEntity | null;

  @Column({
    nullable: true,
    type: Number,
  })
  unitPrice?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  orderQty?: number | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
