import { Module } from '@nestjs/common';
import { SupplierBlTankStorageRepository } from '../supplier-bl-tank-storage.repository';
import { SupplierBlTankStorageRelationalRepository } from './repositories/supplier-bl-tank-storage.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierBlTankStorageEntity } from './entities/supplier-bl-tank-storage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierBlTankStorageEntity])],
  providers: [
    {
      provide: SupplierBlTankStorageRepository,
      useClass: SupplierBlTankStorageRelationalRepository,
    },
  ],
  exports: [SupplierBlTankStorageRepository],
})
export class RelationalSupplierBlTankStoragePersistenceModule {}
