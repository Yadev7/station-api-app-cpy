import { StationsModule } from '../stations/stations.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { StationOwnersService } from './station-owners.service';
import { StationOwnersController } from './station-owners.controller';
import { RelationalStationOwnerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => StationsModule),

    // do not remove this comment
    RelationalStationOwnerPersistenceModule,
  ],
  controllers: [StationOwnersController],
  providers: [StationOwnersService],
  exports: [StationOwnersService, RelationalStationOwnerPersistenceModule],
})
export class StationOwnersModule {}
