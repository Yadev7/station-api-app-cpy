import { Module } from '@nestjs/common';
import { SupplierBlRepository } from '../supplier-bl.repository';
import { SupplierBlRelationalRepository } from './repositories/supplier-bl.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierBlEntity } from './entities/supplier-bl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierBlEntity])],
  providers: [
    {
      provide: SupplierBlRepository,
      useClass: SupplierBlRelationalRepository,
    },
  ],
  exports: [SupplierBlRepository],
})
export class RelationalSupplierBlPersistenceModule {}
