import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { SupplierIncomePaiementsService } from './supplier-income-paiements.service';
import { SupplierIncomePaiementsController } from './supplier-income-paiements.controller';
import { RelationalSupplierIncomePaiementPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalSupplierIncomePaiementPersistenceModule,
  ],
  controllers: [SupplierIncomePaiementsController],
  providers: [SupplierIncomePaiementsService],
  exports: [
    SupplierIncomePaiementsService,
    RelationalSupplierIncomePaiementPersistenceModule,
  ],
})
export class SupplierIncomePaiementsModule {}
