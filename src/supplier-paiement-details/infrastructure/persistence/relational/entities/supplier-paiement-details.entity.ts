import { SupplierIncomeEntity } from '../../../../../supplier-incomes/infrastructure/persistence/relational/entities/supplier-income.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'supplier_paiement_details',
  schema: 'station-achat',
})
export class SupplierPaiementDetailsEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: Number,
  })
  paiementAmount?: number | null;

  @OneToOne(() => SupplierIncomeEntity, { eager: true, nullable: true })
  @JoinColumn()
  SupplierIncomeId?: SupplierIncomeEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
