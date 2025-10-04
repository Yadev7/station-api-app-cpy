import { Module } from '@nestjs/common';
import { DevisProductRepository } from '../devis-product.repository';
import { DevisProductRelationalRepository } from './repositories/devis-product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevisProductEntity } from './entities/devis-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DevisProductEntity])],
  providers: [
    {
      provide: DevisProductRepository,
      useClass: DevisProductRelationalRepository,
    },
  ],
  exports: [DevisProductRepository],
})
export class RelationalDevisProductPersistenceModule {}
