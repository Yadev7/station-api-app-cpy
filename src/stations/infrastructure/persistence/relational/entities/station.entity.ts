import { IsletEntity } from '../../../../../islets/infrastructure/persistence/relational/entities/islet.entity';

import { DepositEntity } from '../../../../../deposits/infrastructure/persistence/relational/entities/deposit.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { StationOwnerEntity } from '../../../../../station-owners/infrastructure/persistence/relational/entities/station-owner.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { ContactDto } from '../../../../../shared/dto/contact.dto';
import { AddressDto } from '../../../../../shared/dto/address.dto';
import { TankEntity } from 'src/tanks/infrastructure/persistence/relational/entities/tank.entity';

@Entity({
  name: 'station',
  schema: 'station-config',
})
export class StationEntity extends EntityRelationalHelper {
  @OneToMany(() => IsletEntity, (childEntity) => childEntity.station, {
    eager: true,
    nullable: true,
  })
  islets?: IsletEntity[] | null;

  @OneToMany(() => TankEntity, (childEntity) => childEntity.station, {
    eager: true,
    nullable: true,
  })
  tanks?: TankEntity[] | null;

  @OneToMany(() => DepositEntity, (childEntity) => childEntity.station, {
    eager: true,
    nullable: true,
  })
  deposits?: DepositEntity[] | null;

  @OneToMany(() => ProductEntity, (childEntity) => childEntity.station, {
    eager: true,
    nullable: true,
  })
  products?: ProductEntity[] | null;

  @ManyToOne(
    () => StationOwnerEntity,
    (parentEntity) => parentEntity.stations,
    { eager: false, nullable: false },
  )
  owner: StationOwnerEntity;

  @Column({
    nullable: false,
    type: String,
  })
  name?: string;

  @Column({
    nullable: true,
    type: String,
  })
  ICE?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  RC?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  IF?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  CNSS?: string | null;

  @Column({
    nullable: true,
    type: Number,
    default: 0,
  })
  tvaCarb?: number | null;

  @Column({
    nullable: true,
    type: Number,
    default: 0,
  })
  tvaLub?: number | null;

  @Column({
    nullable: true,
    type: Number,
    default: 0,
  })
  tvaService?: number | null;

  @Column({
    nullable: true,
    type: Number,
    default: 0,
  })
  tvaCoffeRest?: number | null;

  @Column({
    nullable: true,
    type: Number,
    default: 0,
  })
  tvaShop?: number | null;

  @Column({
    nullable: true,
    type: Boolean,
    default: false,
  })
  displayHeader?: boolean | null;

  @Column({
    nullable: true,
    type: Boolean,
    default: false,
  })
  displayFooter?: boolean | null;

  @Column({
    nullable: true,
    type: String,
  })
  logo?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  stampImg?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  signatureImg?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  imgs?: string | null;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  contact?: ContactDto | null;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  address?: AddressDto | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
