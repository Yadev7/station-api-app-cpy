import { Module } from '@nestjs/common';
import { SupplierBlDetailsRepository } from '../supplier-bl-details.repository';
import { SupplierBlDetailsRelationalRepository } from './repositories/supplier-bl-details.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierBlDetailsEntity } from './entities/supplier-bl-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierBlDetailsEntity])],
  providers: [
    {
      provide: SupplierBlDetailsRepository,
      useClass: SupplierBlDetailsRelationalRepository,
    },
  ],
  exports: [SupplierBlDetailsRepository],
})
export class RelationalSupplierBlDetailsPersistenceModule {}
