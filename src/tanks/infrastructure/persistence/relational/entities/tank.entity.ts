import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { StationEntity } from 'src/stations/infrastructure/persistence/relational/entities/station.entity';
import { ProductEntity } from 'src/products/infrastructure/persistence/relational/entities/product.entity';

@Entity({
  name: 'tank',
  schema: 'station-config',
})
export class TankEntity extends EntityRelationalHelper {
  @ManyToOne(() => ProductEntity, (parentEntity) => parentEntity.tanks, {
    eager: false,
    nullable: false,
  })
  product: ProductEntity;

  @ManyToOne(() => StationEntity, (parentEntity) => parentEntity.tanks, {
    eager: false,
    nullable: false,
  })
  station: StationEntity;

  @Column({
    nullable: true,
    type: String,
  })
  desc?: string | null;

  @Column({
    type: 'decimal', //  'decimal' if you want decimals
    nullable: false,
    default: 0, // ✅ default in DB
  })
  maxCapacity?: number;

  @Column({
    nullable: false,
    type: 'decimal', //  'decimal' if you want decimals
    default: 0, // ✅ default in DB
  })
  minCapacity?: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false, // ✅ default in DB
  })
  directSale: boolean = false;

  @Column({
    type: 'varchar',
    length: 10, // ✅ max 10 characters
    nullable: false,
    unique: true, // ✅ unique constraint
  })
  refId: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
