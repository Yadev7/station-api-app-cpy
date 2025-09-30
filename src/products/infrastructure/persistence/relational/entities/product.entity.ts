import { StationEntity } from '../../../../../stations/infrastructure/persistence/relational/entities/station.entity';

import { CategoryEntity } from '../../../../../categories/infrastructure/persistence/relational/entities/category.entity';

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
import { PriceHistory } from 'src/shared/classes/pricehistory';
import { TankEntity } from 'src/tanks/infrastructure/persistence/relational/entities/tank.entity';

@Entity({
  name: 'product',
  schema: 'station-config',
})
export class ProductEntity extends EntityRelationalHelper {
  @OneToMany(() => TankEntity, (childEntity) => childEntity.station, {
    eager: true,
    nullable: true,
  })
  tanks?: TankEntity[] | null;

  @ManyToOne(() => StationEntity, (parentEntity) => parentEntity.products, {
    eager: false,
    nullable: false,
  })
  station: StationEntity;

  @ManyToOne(() => CategoryEntity, (parentEntity) => parentEntity.products, {
    eager: false,
    nullable: false,
  })
  category: CategoryEntity;

  @Column({
    nullable: true,
    type: 'jsonb',
  })
  pricesHistory?: PriceHistory[] | null;

  @Column({
    nullable: true,
    type: Date,
  })
  dateAppliedPrices?: Date | null;

  @Column({
    nullable: true,
    type: Number,
  })
  salePrice?: number | null;

  @Column({
    nullable: true,
    type: Number,
  })
  purchasePrice?: number | null;

  @Column({
    nullable: true,
    type: String,
  })
  unit?: string | null;

  @Column({
    nullable: false,
    type: Number,
  })
  totalQuantity?: number = 0;

  @Column({
    nullable: true,
    type: String,
  })
  desc?: string | null;

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
