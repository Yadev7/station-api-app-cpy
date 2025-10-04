import { Module } from '@nestjs/common';
import { SupplierOrderRepository } from '../supplier-order.repository';
import { SupplierOrderRelationalRepository } from './repositories/supplier-order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierOrderEntity } from './entities/supplier-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierOrderEntity])],
  providers: [
    {
      provide: SupplierOrderRepository,
      useClass: SupplierOrderRelationalRepository,
    },
  ],
  exports: [SupplierOrderRepository],
})
export class RelationalSupplierOrderPersistenceModule {}
