import { Module } from '@nestjs/common';
import { SupplierPaiementDetailsRepository } from '../supplier-paiement-details.repository';
import { SupplierPaiementDetailsRelationalRepository } from './repositories/supplier-paiement-details.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierPaiementDetailsEntity } from './entities/supplier-paiement-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierPaiementDetailsEntity])],
  providers: [
    {
      provide: SupplierPaiementDetailsRepository,
      useClass: SupplierPaiementDetailsRelationalRepository,
    },
  ],
  exports: [SupplierPaiementDetailsRepository],
})
export class RelationalSupplierPaiementDetailsPersistenceModule {}
