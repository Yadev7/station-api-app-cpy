import { ProductsModule } from '../products/products.module';
import { SupplierBlsModule } from '../supplier-bls/supplier-bls.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { SupplierBlDetailsService } from './supplier-bl-details.service';
import { SupplierBlDetailsController } from './supplier-bl-details.controller';
import { RelationalSupplierBlDetailsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    ProductsModule,

    SupplierBlsModule,

    // do not remove this comment
    RelationalSupplierBlDetailsPersistenceModule,
  ],
  controllers: [SupplierBlDetailsController],
  providers: [SupplierBlDetailsService],
  exports: [
    SupplierBlDetailsService,
    RelationalSupplierBlDetailsPersistenceModule,
  ],
})
export class SupplierBlDetailsModule {}
