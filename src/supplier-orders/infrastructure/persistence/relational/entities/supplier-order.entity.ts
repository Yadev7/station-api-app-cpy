import { DevisEntity } from '../../../../../devis/infrastructure/persistence/relational/entities/devis.entity';
import { SupplierEntity } from '../../../../../suppliers/infrastructure/persistence/relational/entities/supplier.entity';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

// ✅ Enum definition
export enum OrderSupplierState {
  CREATED = 'Created',
  ENVOYEE = 'Send',
  LIV_PARTIAL = 'LivPartiel',
  LIV_TOTAL = 'LivTotal',
}

@Entity({
  name: 'supplier_order',
  schema: 'station-achat',
})
export class SupplierOrderEntity extends EntityRelationalHelper {
  // ✅ Use enum type for the column
  @Column({
    type: 'enum',
    enum: OrderSupplierState,
    nullable: true,
  })
  orderSupplierState?: OrderSupplierState | null;

  @OneToMany(() => DevisEntity, (childEntity) => childEntity.supplierOrderRef, {
    eager: true,
    nullable: true,
  })
  idDevis?: DevisEntity[] | null;

  @Column({
    nullable: true,
    type: 'float',
  })
  Amount?: number | null;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  orderState?: string | null;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  orderRef?: string | null;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  date?: Date | null;

  @ManyToOne(() => SupplierEntity, { eager: true, nullable: true })
  idSupplier?: SupplierEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
