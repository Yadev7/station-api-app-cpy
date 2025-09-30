import { IsletsModule } from '../islets/islets.module';
import { TanksModule } from '../tanks/tanks.module';
import { DepositsModule } from '../deposits/deposits.module';
import { ProductsModule } from '../products/products.module';
import { StationOwnersModule } from '../station-owners/station-owners.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { StationsService } from './stations.service';
import { StationsController } from './stations.controller';
import { RelationalStationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => IsletsModule),

    forwardRef(() => DepositsModule),

    forwardRef(() => TanksModule),

    forwardRef(() => ProductsModule),

    forwardRef(() => StationOwnersModule),

    // do not remove this comment
    RelationalStationPersistenceModule,
  ],
  controllers: [StationsController],
  providers: [StationsService],
  exports: [StationsService, RelationalStationPersistenceModule],
})
export class StationsModule {}
