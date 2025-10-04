import { SupplierOrdersModule } from '../supplier-orders/supplier-orders.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { DevisService } from './devis.service';
import { DevisController } from './devis.controller';
import { RelationalDevisPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => SupplierOrdersModule),

    SuppliersModule,

    // do not remove this comment
    RelationalDevisPersistenceModule,
  ],
  controllers: [DevisController],
  providers: [DevisService],
  exports: [DevisService, RelationalDevisPersistenceModule],
})
export class DevisModule {}
