import { TanksModule } from '../tanks/tanks.module';
import { ProductsModule } from '../products/products.module';
import { SupplierBlsModule } from '../supplier-bls/supplier-bls.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { SupplierBlTankStoragesService } from './supplier-bl-tank-storages.service';
import { SupplierBlTankStoragesController } from './supplier-bl-tank-storages.controller';
import { RelationalSupplierBlTankStoragePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    TanksModule,

    ProductsModule,

    SupplierBlsModule,

    // do not remove this comment
    RelationalSupplierBlTankStoragePersistenceModule,
  ],
  controllers: [SupplierBlTankStoragesController],
  providers: [SupplierBlTankStoragesService],
  exports: [
    SupplierBlTankStoragesService,
    RelationalSupplierBlTankStoragePersistenceModule,
  ],
})
export class SupplierBlTankStoragesModule {}
