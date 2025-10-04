import { DevisEntity } from '../../../../../devis/infrastructure/persistence/relational/entities/devis.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

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
  name: 'devis_product',
  schema: 'station-achat',
})
export class DevisProductEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  SupplierPrice?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  unit?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  Qty?: string | null;

  @ManyToOne(() => DevisEntity, { eager: true, nullable: true })
  idDevis?: DevisEntity | null;

  @ManyToOne(() => ProductEntity, { eager: true, nullable: true })
  idProduct?: ProductEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
