import { Module } from '@nestjs/common';
import { DispenserRepository } from '../dispenser.repository';
import { DispenserRelationalRepository } from './repositories/dispenser.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DispenserEntity } from './entities/dispenser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DispenserEntity])],
  providers: [
    {
      provide: DispenserRepository,
      useClass: DispenserRelationalRepository,
    },
  ],
  exports: [DispenserRepository],
})
export class RelationalDispenserPersistenceModule {}
