import { Module } from '@nestjs/common';
import { DepositRepository } from '../deposit.repository';
import { DepositRelationalRepository } from './repositories/deposit.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositEntity } from './entities/deposit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepositEntity])],
  providers: [
    {
      provide: DepositRepository,
      useClass: DepositRelationalRepository,
    },
  ],
  exports: [DepositRepository],
})
export class RelationalDepositPersistenceModule {}
