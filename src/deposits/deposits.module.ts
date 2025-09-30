import { StationsModule } from '../stations/stations.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { DepositsController } from './deposits.controller';
import { RelationalDepositPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => StationsModule),

    // do not remove this comment
    RelationalDepositPersistenceModule,
  ],
  controllers: [DepositsController],
  providers: [DepositsService],
  exports: [DepositsService, RelationalDepositPersistenceModule],
})
export class DepositsModule {}
