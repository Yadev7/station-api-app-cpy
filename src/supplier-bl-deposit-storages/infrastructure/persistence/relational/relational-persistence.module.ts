import { Module } from '@nestjs/common';
import { SupplierBlDepositStorageRepository } from '../supplier-bl-deposit-storage.repository';
import { SupplierBlDepositStorageRelationalRepository } from './repositories/supplier-bl-deposit-storage.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierBlDepositStorageEntity } from './entities/supplier-bl-deposit-storage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierBlDepositStorageEntity])],
  providers: [
    {
      provide: SupplierBlDepositStorageRepository,
      useClass: SupplierBlDepositStorageRelationalRepository,
    },
  ],
  exports: [SupplierBlDepositStorageRepository],
})
export class RelationalSupplierBlDepositStoragePersistenceModule {}
