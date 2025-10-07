import { SupplierIncomesModule } from '../supplier-incomes/supplier-incomes.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { SupplierPaiementDetailsService } from './supplier-paiement-details.service';
import { SupplierPaiementDetailsController } from './supplier-paiement-details.controller';
import { RelationalSupplierPaiementDetailsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    SupplierIncomesModule,

    // do not remove this comment
    RelationalSupplierPaiementDetailsPersistenceModule,
  ],
  controllers: [SupplierPaiementDetailsController],
  providers: [SupplierPaiementDetailsService],
  exports: [
    SupplierPaiementDetailsService,
    RelationalSupplierPaiementDetailsPersistenceModule,
  ],
})
export class SupplierPaiementDetailsModule {}
