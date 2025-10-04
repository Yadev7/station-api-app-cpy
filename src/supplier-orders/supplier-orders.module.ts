import { DevisModule } from '../devis/devis.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { SupplierOrdersService } from './supplier-orders.service';
import { SupplierOrdersController } from './supplier-orders.controller';
import { RelationalSupplierOrderPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => DevisModule),

    SuppliersModule,

    // do not remove this comment
    RelationalSupplierOrderPersistenceModule,
  ],
  controllers: [SupplierOrdersController],
  providers: [SupplierOrdersService],
  exports: [SupplierOrdersService, RelationalSupplierOrderPersistenceModule],
})
export class SupplierOrdersModule {}
