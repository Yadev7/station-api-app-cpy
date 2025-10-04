import { SupplierOrdersModule } from '../supplier-orders/supplier-orders.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { SupplierBlsService } from './supplier-bls.service';
import { SupplierBlsController } from './supplier-bls.controller';
import { RelationalSupplierBlPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    SupplierOrdersModule,

    // do not remove this comment
    RelationalSupplierBlPersistenceModule,
  ],
  controllers: [SupplierBlsController],
  providers: [SupplierBlsService],
  exports: [SupplierBlsService, RelationalSupplierBlPersistenceModule],
})
export class SupplierBlsModule {}
