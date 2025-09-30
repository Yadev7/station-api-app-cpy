import { Category } from '../../../../domain/category';
import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

//import { CategoryMapper } from '../../../../../categories/infrastructure/persistence/relational/mappers/category.mapper';

import { CategoryEntity } from '../entities/category.entity';

export class CategoryMapper {
  static toDomain(raw: CategoryEntity): Category {
    const domainEntity = new Category();
    if (raw.products) {
      domainEntity.products = raw.products.map((item) =>
        ProductMapper.toDomain(item),
      );
    } else if (raw.products === null) {
      domainEntity.products = null;
    }

    if (raw.children) {
      domainEntity.children = raw.children.map((item) =>
        CategoryMapper.toDomain(item),
      );
    } else if (raw.children === null) {
      domainEntity.children = null;
    }

    if (raw.catParent) {
      domainEntity.catParent = CategoryMapper.toDomain(raw.catParent);
    }

    domainEntity.catName = raw.catName;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Category): CategoryEntity {
    const persistenceEntity = new CategoryEntity();
    if (domainEntity.products) {
      persistenceEntity.products = domainEntity.products.map((item) =>
        ProductMapper.toPersistence(item),
      );
    } else if (domainEntity.products === null) {
      persistenceEntity.products = null;
    }

    if (domainEntity.children) {
      persistenceEntity.children = domainEntity.children.map((item) =>
        CategoryMapper.toPersistence(item),
      );
    } else if (domainEntity.children === null) {
      persistenceEntity.children = null;
    }

    if (domainEntity.catParent) {
      persistenceEntity.catParent = CategoryMapper.toPersistence(
        domainEntity.catParent,
      );
    }

    persistenceEntity.catName = domainEntity.catName;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
