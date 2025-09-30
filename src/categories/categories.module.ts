import { ProductsModule } from '../products/products.module';
//import { CategoriesModule } from '../categories/categories.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { RelationalCategoryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => ProductsModule),

    forwardRef(() => CategoriesModule),

    // do not remove this comment
    RelationalCategoryPersistenceModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService, RelationalCategoryPersistenceModule],
})
export class CategoriesModule {}
