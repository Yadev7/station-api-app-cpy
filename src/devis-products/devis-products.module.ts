import { DevisModule } from '../devis/devis.module';
import { ProductsModule } from '../products/products.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { DevisProductsService } from './devis-products.service';
import { DevisProductsController } from './devis-products.controller';
import { RelationalDevisProductPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    DevisModule,

    ProductsModule,

    // do not remove this comment
    RelationalDevisProductPersistenceModule,
  ],
  controllers: [DevisProductsController],
  providers: [DevisProductsService],
  exports: [DevisProductsService, RelationalDevisProductPersistenceModule],
})
export class DevisProductsModule {}
