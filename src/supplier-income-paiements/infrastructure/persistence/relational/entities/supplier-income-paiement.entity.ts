import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'supplier_income_paiement',
  schema: 'station-achat',
})
export class SupplierIncomePaiementEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  paiementType?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
