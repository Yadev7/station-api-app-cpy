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
  name: 'supplier_bl_details',
  schema: 'station-achat',
})
export class SupplierBlDetailsEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  price?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  unitPrice?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  deliveredQty?: number | null;

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
