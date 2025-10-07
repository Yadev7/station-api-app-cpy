import { SupplierBlEntity } from '../../../../../supplier-bls/infrastructure/persistence/relational/entities/supplier-bl.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'supplier_income',
  schema: 'station-achat',
})
export class SupplierIncomeEntity extends EntityRelationalHelper {
  @OneToOne(() => SupplierBlEntity, { eager: true, nullable: true })
  @JoinColumn()
  SupplierBlId?: SupplierBlEntity | null;

  @Column({
    nullable: true,
    type: String,
  })
  comment?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  IncomeScan?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
