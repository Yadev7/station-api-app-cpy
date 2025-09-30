import { StationsModule } from '../stations/stations.module';
import {
  forwardRef,
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { TanksService } from './tanks.service';
import { TanksController } from './tanks.controller';
import { RelationalTankPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ProductsModule } from '../products/products.module';
@Module({
  imports: [
    forwardRef(() => StationsModule),
    forwardRef(() => ProductsModule),
    // do not remove this comment
    RelationalTankPersistenceModule,
  ],
  controllers: [TanksController],
  providers: [TanksService],
  exports: [TanksService, RelationalTankPersistenceModule],
})
export class TanksModule {}
