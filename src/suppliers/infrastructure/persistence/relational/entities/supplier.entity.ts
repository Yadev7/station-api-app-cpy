import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ContactDto } from '../../../../../shared/dto/contact.dto';
import { AddressDto } from '../../../../../shared/dto/address.dto';

@Entity({
  name: 'supplier',
  schema: 'station-achat',
})
export class SupplierEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: 'jsonb',
  })
  address?: AddressDto | null;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  contact?: ContactDto | null;

  @Column({
    nullable: true,
    type: Number,
  })
  ice?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  name?: string | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
