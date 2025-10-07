import { SupplierBlsModule } from '../supplier-bls/supplier-bls.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { SupplierIncomesService } from './supplier-incomes.service';
import { SupplierIncomesController } from './supplier-incomes.controller';
import { RelationalSupplierIncomePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    SupplierBlsModule,

    // do not remove this comment
    RelationalSupplierIncomePersistenceModule,
  ],
  controllers: [SupplierIncomesController],
  providers: [SupplierIncomesService],
  exports: [SupplierIncomesService, RelationalSupplierIncomePersistenceModule],
})
export class SupplierIncomesModule {}
