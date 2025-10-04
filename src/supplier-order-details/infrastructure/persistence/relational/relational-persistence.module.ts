import { Module } from '@nestjs/common';
import { SupplierOrderDetailsRepository } from '../supplier-order-details.repository';
import { SupplierOrderDetailsRelationalRepository } from './repositories/supplier-order-details.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierOrderDetailsEntity } from './entities/supplier-order-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierOrderDetailsEntity])],
  providers: [
    {
      provide: SupplierOrderDetailsRepository,
      useClass: SupplierOrderDetailsRelationalRepository,
    },
  ],
  exports: [SupplierOrderDetailsRepository],
})
export class RelationalSupplierOrderDetailsPersistenceModule {}
