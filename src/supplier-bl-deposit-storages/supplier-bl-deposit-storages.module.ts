import { DepositsModule } from '../deposits/deposits.module';
import { ProductsModule } from '../products/products.module';
import { SupplierBlsModule } from '../supplier-bls/supplier-bls.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { SupplierBlDepositStoragesService } from './supplier-bl-deposit-storages.service';
import { SupplierBlDepositStoragesController } from './supplier-bl-deposit-storages.controller';
import { RelationalSupplierBlDepositStoragePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    DepositsModule,

    ProductsModule,

    forwardRef(() => SupplierBlsModule),

    // do not remove this comment
    RelationalSupplierBlDepositStoragePersistenceModule,
  ],
  controllers: [SupplierBlDepositStoragesController],
  providers: [SupplierBlDepositStoragesService],
  exports: [
    SupplierBlDepositStoragesService,
    RelationalSupplierBlDepositStoragePersistenceModule,
  ],
})
export class SupplierBlDepositStoragesModule {}
