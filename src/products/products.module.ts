import { TanksModule } from '../tanks/tanks.module';
import { StationsModule } from '../stations/stations.module';
import { CategoriesModule } from '../categories/categories.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { RelationalProductPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => TanksModule),

    forwardRef(() => StationsModule),

    forwardRef(() => CategoriesModule),

    // do not remove this comment
    RelationalProductPersistenceModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService, RelationalProductPersistenceModule],
})
export class ProductsModule {}
