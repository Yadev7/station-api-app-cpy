import { DispensersModule } from '../dispensers/dispensers.module';
import { StationsModule } from '../stations/stations.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { IsletsService } from './islets.service';
import { IsletsController } from './islets.controller';
import { RelationalIsletPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => DispensersModule),

    forwardRef(() => StationsModule),

    // do not remove this comment
    RelationalIsletPersistenceModule,
  ],
  controllers: [IsletsController],
  providers: [IsletsService],
  exports: [IsletsService, RelationalIsletPersistenceModule],
})
export class IsletsModule {}
