import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

//import { CategoryEntity } from '../../../../../categories/infrastructure/persistence/relational/entities/category.entity';

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

@Entity({
  name: 'category',
  schema: 'station-config',
})
export class CategoryEntity extends EntityRelationalHelper {
  @OneToMany(() => ProductEntity, (childEntity) => childEntity.category, {
    eager: true,
    nullable: true,
  })
  products?: ProductEntity[] | null;

  @OneToMany(() => CategoryEntity, (childEntity) => childEntity.catParent, {
    eager: false,
    nullable: true,
  })
  children?: CategoryEntity[] | null;

  @ManyToOne(() => CategoryEntity, (parentEntity) => parentEntity.children, {
    eager: false,
    nullable: true,
  })
  catParent?: CategoryEntity;

  @Column({
    nullable: false,
    type: String,
  })
  catName: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
