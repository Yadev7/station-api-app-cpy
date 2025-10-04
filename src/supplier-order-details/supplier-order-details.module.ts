import { ProductsModule } from '../products/products.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { SupplierOrderDetailsService } from './supplier-order-details.service';
import { SupplierOrderDetailsController } from './supplier-order-details.controller';
import { RelationalSupplierOrderDetailsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ProductsModule,

    SuppliersModule,

    // do not remove this comment
    RelationalSupplierOrderDetailsPersistenceModule,
  ],
  controllers: [SupplierOrderDetailsController],
  providers: [SupplierOrderDetailsService],
  exports: [
    SupplierOrderDetailsService,
    RelationalSupplierOrderDetailsPersistenceModule,
  ],
})
export class SupplierOrderDetailsModule {}
