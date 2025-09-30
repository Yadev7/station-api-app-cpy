import { DispensersModule } from '../dispensers/dispensers.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { NozzlesService } from './nozzles.service';
import { NozzlesController } from './nozzles.controller';
import { RelationalNozzlePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => DispensersModule),

    // do not remove this comment
    RelationalNozzlePersistenceModule,
  ],
  controllers: [NozzlesController],
  providers: [NozzlesService],
  exports: [NozzlesService, RelationalNozzlePersistenceModule],
})
export class NozzlesModule {}
