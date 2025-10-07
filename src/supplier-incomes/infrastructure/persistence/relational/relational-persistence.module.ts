import { Module } from '@nestjs/common';
import { SupplierIncomeRepository } from '../supplier-income.repository';
import { SupplierIncomeRelationalRepository } from './repositories/supplier-income.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierIncomeEntity } from './entities/supplier-income.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierIncomeEntity])],
  providers: [
    {
      provide: SupplierIncomeRepository,
      useClass: SupplierIncomeRelationalRepository,
    },
  ],
  exports: [SupplierIncomeRepository],
})
export class RelationalSupplierIncomePersistenceModule {}
