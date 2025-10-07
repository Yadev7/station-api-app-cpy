import { SupplierBlDepositStoragesModule } from '../supplier-bl-deposit-storages/supplier-bl-deposit-storages.module';
import { SupplierOrdersModule } from '../supplier-orders/supplier-orders.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { SupplierBlsService } from './supplier-bls.service';
import { SupplierBlsController } from './supplier-bls.controller';
import { RelationalSupplierBlPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => SupplierBlDepositStoragesModule),

    SupplierOrdersModule,

    // do not remove this comment
    RelationalSupplierBlPersistenceModule,
  ],
  controllers: [SupplierBlsController],
  providers: [SupplierBlsService],
  exports: [SupplierBlsService, RelationalSupplierBlPersistenceModule],
})
export class SupplierBlsModule {}
