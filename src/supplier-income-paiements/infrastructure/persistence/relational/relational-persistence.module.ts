import { Module } from '@nestjs/common';
import { SupplierIncomePaiementRepository } from '../supplier-income-paiement.repository';
import { SupplierIncomePaiementRelationalRepository } from './repositories/supplier-income-paiement.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierIncomePaiementEntity } from './entities/supplier-income-paiement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierIncomePaiementEntity])],
  providers: [
    {
      provide: SupplierIncomePaiementRepository,
      useClass: SupplierIncomePaiementRelationalRepository,
    },
  ],
  exports: [SupplierIncomePaiementRepository],
})
export class RelationalSupplierIncomePaiementPersistenceModule {}
